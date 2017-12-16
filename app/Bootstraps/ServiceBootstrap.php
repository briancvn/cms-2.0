<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Utils;
use CMS\Extensions\Auth\Manager as AuthManager;
use CMS\Extensions\Cache\Manager as CacheManager;
use CMS\Extensions\Mapper\Manager as MapperManager;
use CMS\Constants\Services;

class ServiceBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        foreach (Utils::scanNamespaces('CMS\Services', SERVICES_DIR) as $serviceName) {
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
                'arguments' => $arguments,
                "calls" => [
                    [
                        "method"    => "setAuthManager",
                        "arguments" => [
                            [
                                "type"  => "service",
                                "name" => AuthManager::class
                            ]
                        ]
                    ],
                    [
                        "method"    => "setMapper",
                        "arguments" => [
                            [
                                "type"  => "service",
                                "name" => MapperManager::class
                            ]
                        ]
                    ]
                ]
            ]);
        }
    }
}
