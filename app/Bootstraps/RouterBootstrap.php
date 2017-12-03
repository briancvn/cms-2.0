<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;
use Phalcon\Mvc\Router;

use CMS\BootstrapInterface;
use CMS\Extensions\RouteAnnotations;
use CMS\Extensions\Api;

class RouterBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        // Create the micro route annotation object, passing the micro app into the constructor
        $routeAnnotations = new RouteAnnotations($api, $di);

        // Add a directory of "controllers" that are namespaced
        $routeAnnotations->addControllerNamespace('CMS\Controllers', CONTROLLERS_DIR);

        // Add the rotues to our micro app
        $routeAnnotations->mount();
    }
}
