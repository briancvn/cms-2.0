<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Util;

class ServiceBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        foreach (Util::scanNamespaces('CMS\Services', SERVICES_DIR) as $serviceName) {
            $arguments = [];
            $classRef = new \ReflectionClass($serviceName);
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

            $di->set($serviceName, [
                'className' => $serviceName,
                'arguments' => $arguments
            ]);
        }
    }
}
