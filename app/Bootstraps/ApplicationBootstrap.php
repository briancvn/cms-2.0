<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Session\Adapter\Files as SessionAdapter;
use Doctrine\ODM\MongoDB\Configuration;
use Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\MongoDB\Connection;

use AutoMapperPlus\Configuration\AutoMapperConfig;

use CMS\Domains\MappingProfile;
use CMS\BootstrapInterface;
use CMS\Constants\Services;
use CMS\Extensions\Api;
use CMS\Extensions\Mapper\Manager as MapperManager;
use CMS\Extensions\Auth\TokenParsers\JWTTokenParser;
use CMS\Extensions\Auth\Session;
use CMS\Extensions\Auth\Manager as AuthManager;
use CMS\Extensions\Cache\Manager as CacheManager;

class ApplicationBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        AnnotationDriver::registerAnnotationClasses();

        $di->setShared(Services::CONFIG, $config);

        $di->set(Services::DOCUMENT_MANAGER, function () use ($config) {
            $config = $config->get('database')->mongo;

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

        $di->setShared(Services::EVENTS_MANAGER, function () {
            return new EventsManager;
        });

        $di->setShared(MapperManager::class, function () {
            return MapperManager::initialize(function (AutoMapperConfig $config) {
                MappingProfile::mappingConfig($config);
            });
        });

        $di->setShared(Services::TOKEN_PARSER, function () use ($di, $config) {
            return new JWTTokenParser($config->get('authentication')->secret, JWTTokenParser::ALGORITHM_HS256);
        });

        $di->setShared(AuthManager::class, function () use ($di, $config) {
            $sessionAdapter = $di->get(Services::SESSION);
            $session = unserialize($sessionAdapter->get(Services::AUTH_MANAGER));
            return new AuthManager(
                $config->get('authentication')->expirationTime,
                $session ? $session : null
            );
        });

        $di->setShared(CacheManager::class, function () {
            return new CacheManager;
        });

        $di->setShared(Services::SESSION, function () {
            $session = new SessionAdapter();
            $session->start();

            return $session;
        });
    }
}
