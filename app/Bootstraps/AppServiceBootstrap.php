<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Events\Manager as EventsManager;
use Doctrine\ODM\MongoDB\Configuration;
use Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\MongoDB\Connection;

use CMS\BootstrapInterface;
use CMS\Constants\Services;
use CMS\Extensions\Api;

class AppServiceBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        $di->setShared(Services::CONFIG, $config);

        $di->set(Services::DOCUMENT_MANAGER, function () use ($config) {
            $config = $config->get('database')->mongo;

            AnnotationDriver::registerAnnotationClasses();
            $configuration = new Configuration();
            $configuration->setProxyDir(APP_DIR.'/Cache/Doctrine/Proxy');
            $configuration->setProxyNamespace('Proxies');
            $configuration->setHydratorDir(APP_DIR.'/Cache/Doctrine/Hydrator');
            $configuration->setHydratorNamespace('Hydrators');
            $configuration->setDefaultDB($config->dbname);
            $configuration->setMetadataDriverImpl(AnnotationDriver::create([DOMAINS_DIR, REPOSITORIES_DIR]));

            $mongoClient = new \MongoClient($config->server);
            $connection = new Connection($mongoClient);
            $dm = DocumentManager::create($connection, $configuration);
            return $dm;
        });

        $di->set(Services::URL, function () use ($config) {
            $url = new UrlResolver;
            $url->setBaseUri($config->get('application')->baseUri);
            return $url;
        });

//        $di->setShared(Services::EVENTS_MANAGER, function () use ($di, $config) {
//            return new EventsManager;
//        });
    }
}
