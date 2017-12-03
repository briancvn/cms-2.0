<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Services\PeopleService;
use CMS\Extensions\Api;

class ServiceBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        $di->set(PeopleService::class, ['className' => 'CMS\\Services\\PeopleService']);
    }
}
