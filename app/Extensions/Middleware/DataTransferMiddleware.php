<?php

namespace CMS\Extensions\Middleware;

use CMS\Contracts\AuthRequestDto;
use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\MiddlewareInterface;

use CMS\Extensions\Mvc\Plugin;
use CMS\Constants\Services;

class DataTransferMiddleware extends Plugin implements MiddlewareInterface
{
    public function beforeExecuteRoute()
    {
        $router = $this->getDi()->get(Services::ROUTER)->getMatchedRoute();
        $param = ['action' => $router->getName()];

        $request = $this->getDi()->get(Services::REQUEST);
        $param['param'] = json_decode($request->getRawBody());

        $dispatcher = $this->getDi()->get(Services::DISPATCHER);
        $dispatcher->setParams($param);
    }

    public function call(Micro $api)
    {
        return true;
    }
}