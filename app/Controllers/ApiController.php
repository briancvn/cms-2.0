<?php

namespace CMS\Controllers;

use Phalcon\Mvc\Dispatcher;

use CMS\Constants\HttpMethods;
use CMS\Extensions\Mvc\Controller;
use CMS\Extensions\Cache\Manager as CacheManager;
use CMS\Extensions\Mapper\Manager as Mapper;

abstract class ApiController extends Controller
{
    protected $config;

    /** @var Dispatcher */
    protected $dispatcher;

    /** @var CacheManager */
    protected $cache;

    /** @var Mapper */
    protected $mapper;

    /** @Ignore */
    public function setConfig($config)
    {
        $this->config = $config;
    }

    /** @Ignore */
    public function setDispatcher(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /** @Ignore */
    public function setCache(CacheManager $cache)
    {
        $this->cache = $cache;
    }

    /** @Ignore */
    public function setMapper(Mapper $mapper)
    {
        $this->mapper = $mapper;
    }

    /** @Ignore */
    public function callAction()
    {
        $action = $this->dispatcher->getParam('action');
        $httpMethods = $this->dispatcher->getParam('httpMethods');
        $param = $this->dispatcher->getParam('param');

        $methodRef = new \ReflectionMethod($this, $action);
        $actionCache = $this->cache->getControllerAction($methodRef->getDeclaringClass()->getName(), $action);

        if ($httpMethods !== HttpMethods::GET) {
            if ($param && $actionCache && $actionCache->paramType) {
                $param = $this->mapper->map($param, $actionCache->paramType);
            }
        } else {
            unset($param['_url']);
            unset($param['XDEBUG_SESSION_START']);
            $param = array_pop($param);
        }

        if (empty($methodRef->getParameters())) {
            return $this->{$action}();
        }

        return $this->{$action}($param);
    }
}