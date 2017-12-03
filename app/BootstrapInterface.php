<?php

namespace CMS;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\Extensions\Api;

interface BootstrapInterface {
    public function run(Api $api, DiInterface $di, Config $config);
}