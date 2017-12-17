<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING );

/** @var \Phalcon\Config $config */
$config = null;

/** @var \PhalconRest\Api $app */
$app = null;

/** @var \PhalconApi\Http\Response $response */
$response = null;

session_start();
try {
    define("ROOT_DIR", __DIR__.'/../..');
    define("APP_DIR", ROOT_DIR.'/app');
    define("VENDOR_DIR", ROOT_DIR.'/vendor');
    define("CACHE_DIR", APP_DIR.'/Cache/');
    define("CONFIGS_DIR", APP_DIR.'/Configs');
    define("CONTRACTS_DIR", APP_DIR.'/Contracts');
    define("DOMAINS_DIR", APP_DIR.'/Domains');
    define("SERVICES_DIR", APP_DIR.'/Services');
    define("REPOSITORIES_DIR", APP_DIR.'/Repositories');
    define("CONTROLLERS_DIR", APP_DIR.'/Controllers');
    define("ACCESS_DINIFITIONS_PATH", SERVICES_DIR.'/AccessControlDefinitions.xml');
    define('APPLICATION_ENV', getenv('APPLICATION_ENV') ?: 'development');

    require VENDOR_DIR.'/autoload.php';

    $loader = new \Phalcon\Loader();
    $loader->registerNamespaces(['CMS' => APP_DIR.'/']);
    $loader->register();

    // Configs
    $configPath = CONFIGS_DIR.'/default.php';

    if (!is_readable($configPath)) {
        throw new Exception('Unable to read config from '.$configPath);
    }

    $config = new Phalcon\Config(include_once $configPath);

    $envConfigPath = CONFIGS_DIR.'/server.'.APPLICATION_ENV.'.php';

    if (!is_readable($envConfigPath)) {
        throw new Exception('Unable to read config from '.$envConfigPath);
    }

    $override = new Phalcon\Config(include_once $envConfigPath);
    $config = $config->merge($override);

    $di = new CMS\Extensions\FactoryDefault();
    $app = new CMS\Extensions\Api($di);

    $bootstrap = new CMS\Bootstrap(
        new CMS\Bootstraps\ApplicationBootstrap,
        new CMS\Bootstraps\MiddlewareBootstrap,
        new CMS\Bootstraps\RepositoryBootstrap,
        new CMS\Bootstraps\ServiceBootstrap,
        new CMS\Bootstraps\ControllerBootstrap,
        new CMS\Bootstraps\RouterBootstrap
    );
    $bootstrap->run($app, $di, $config);

    $app->handle();

    // Set appropriate response value
    $response = $app->di->getShared(CMS\Constants\Services::RESPONSE);
    $response->setJsonContent(new CMS\Contracts\ResponseDto($app->getReturnedValue()));
} catch (\Exception $e) {
    $di = $di ?? new CMS\Extensions\FactoryDefault();
    $response = $di->getShared(CMS\Constants\Services::RESPONSE);
    if(!$response || !$response instanceof CMS\Extensions\Http\Response){
        $response = new CMS\Extensions\Http\Response();
    }
    $debugMode = isset($config->debug) ? $config->debug : (APPLICATION_ENV == 'development');
    $response->setErrorContent($e, $debugMode);
}
finally {
    // Send response
    if (!$response->isSent()) {
        $response->send();
    }
}
