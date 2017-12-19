<?php

namespace Test\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Utils;

class GeneratorBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        foreach (Utils::scanNamespaces('Test\Generator', GENERATOR_DIR) as $generatorName) {
            $arguments = [];
            $classRef = new \ReflectionClass($generatorName);
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

            $di->set($generatorName, [
                'className' => $generatorName,
                'arguments' => $arguments
            ]);
        }
    }
}
