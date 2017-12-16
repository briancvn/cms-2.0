<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Utils;
use CMS\Extensions\Mapper\Manager as MapperManager;
use CMS\Extensions\Cache\Manager as CacheManager;
use CMS\Constants\Services;

class ControllerBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        foreach (Utils::scanNamespaces('CMS\Controllers', CONTROLLERS_DIR) as $ctrlName) {
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
                'arguments' => $arguments,
                "calls" => [
                    [
                        "method"    => "setDispatcher",
                        "arguments" => [
                            [
                                "type"  => "service",
                                "name" => Services::DISPATCHER
                            ]
                        ]
                    ],
                    [
                        "method"    => "setCache",
                        "arguments" => [
                            [
                                "type"  => "service",
                                "name" => CacheManager::class
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