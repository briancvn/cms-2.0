<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;
use Phalcon\Mvc\Router;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Middleware\CorsMiddleware;
use CMS\Extensions\Middleware\OptionsResponseMiddleware;
use CMS\Extensions\Middleware\NotFoundMiddleware;
use CMS\Extensions\Middleware\AuthenticationMiddleware;


class MiddlewareBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        $api->attach(new CorsMiddleware($config->cors->allowedOrigins->toArray()))
            ->attach(new OptionsResponseMiddleware)
            ->attach(new NotFoundMiddleware)
            ->attach(new AuthenticationMiddleware);
    }
}