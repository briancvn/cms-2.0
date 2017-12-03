<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Util;

class ControllerBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        foreach (Util::scanNamespaces('CMS\Controllers', CONTROLLERS_DIR) as $ctrlName) {
            $arguments = [];
            $classRef = new \ReflectionClass($ctrlName);
            $constructor = $classRef->getConstructor();
            if ($constructor) {
                $parameters = $constructor->getParameters();
                foreach ($parameters as $param) {
                    array_push($arguments, [
                        "type" => "service",
                        'name' => $param->getClass()->name
                    ]);
                }
            }

            $di->set($ctrlName, [
                'className' => $ctrlName,
                'arguments' => $arguments
            ]);
        }
    }
}