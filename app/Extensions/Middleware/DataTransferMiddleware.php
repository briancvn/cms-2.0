<?php

namespace CMS\Extensions\Middleware;

use CMS\Contracts\AuthRequestDto;
use CMS\Constants\HttpMethods;
use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\MiddlewareInterface;

use CMS\Extensions\Mvc\Plugin;
use CMS\Constants\Services;

class DataTransferMiddleware extends Plugin implements MiddlewareInterface
{
    public function beforeExecuteRoute()
    {
        $router = $this->getDi()->get(Services::ROUTER)->getMatchedRoute();
        $param = [
            'action' => $router->getName(),
            'httpMethods' => $router->getHttpMethods()
        ];

        $request = $this->getDi()->get(Services::REQUEST);
        if ($router->getHttpMethods() === HttpMethods::GET) {
            $param['param'] = $request->getPostedData();
        } else if ($router->getHttpMethods() === HttpMethods::POST) {
            $param['param'] = json_decode($request->getRawBody());
        }

        $dispatcher = $this->getDi()->get(Services::DISPATCHER);
        $dispatcher->setParams($param);
    }

    public function call(Micro $api)
    {
        return true;
    }
}