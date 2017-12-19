<?php

use Phalcon\Di;
use Phalcon\Di\FactoryDefault;
use Phalcon\Loader;

ini_set("display_errors", 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING );

define("ROOT_DIR", __DIR__);
define("APP_DIR", __DIR__.'/../app');
define("CACHE_DIR", APP_DIR.'/Cache/');
define("CONFIGS_DIR", APP_DIR.'/Configs');
define("CONSTANTS_DIR", APP_DIR.'/Constants');
define("CONTRACTS_DIR", APP_DIR.'/Contracts');
define("DOMAINS_DIR", APP_DIR.'/Domains');
define("SERVICES_DIR", APP_DIR.'/Services');
define("REPOSITORIES_DIR", APP_DIR.'/Repositories');
define("CONTROLLERS_DIR", APP_DIR.'/Controllers');
define("ACCESS_DINIFITIONS_PATH", SERVICES_DIR.'/AccessControlDefinitions.xml');

set_include_path(ROOT_DIR.PATH_SEPARATOR.get_include_path());

// Required for phalcon/incubator
include __DIR__ . "/../vendor/autoload.php";

$loader = new Loader();
$loader->registerNamespaces([
    'Test' => ROOT_DIR,
    'CMS' => APP_DIR
]);
$loader->register();

$di = new FactoryDefault();
$config = new Phalcon\Config(include_once CONFIGS_DIR.'/default.php');
$overrideConfig = new Phalcon\Config(include_once CONFIGS_DIR.'/server.test.php');
$config = $config->merge($overrideConfig);
Di::reset();
$bootstrap = new CMS\Bootstrap(
    new CMS\Bootstraps\ApplicationBootstrap,
    new CMS\Bootstraps\MiddlewareBootstrap,
    new CMS\Bootstraps\RepositoryBootstrap,
    new CMS\Bootstraps\ServiceBootstrap,
    new CMS\Bootstraps\ControllerBootstrap,
    new CMS\Bootstraps\RouterBootstrap
);
$bootstrap->run(new CMS\Extensions\Api($di), $di, $config);

Di::setDefault($di);
