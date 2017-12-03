<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Services\PeopleService;
use CMS\Controllers\PeopleController;
use CMS\Extensions\Api;

class InjectionBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        $di->set(PeopleController::class, [
            'className' => 'CMS\\Controllers\\PeopleController',
            'arguments' => [
                [
                    "type" => "service",
                    'name' => PeopleService::class
                ]
            ]
        ]);

//        $di->set(PeopleController::class, [
//            'className' => 'CMS\\Controllers\\PeopleController',
//            'calls' => [
//                [
//                    'method'    => 'setPeopleService',
//                    'arguments' => [
//                        [
//                            'type' => 'service',
//                            'name' => PeopleService::class
//                        ]
//                    ]
//                ]
//            ]
//        ]);
    }
}