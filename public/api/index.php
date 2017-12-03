<?php
error_reporting(E_ALL);

/** @var \Phalcon\Config $config */
$config = null;

/** @var \PhalconRest\Api $app */
$app = null;

/** @var \PhalconApi\Http\Response $response */
$response = null;

try {
    define("ROOT_DIR", __DIR__.'/../..');
    define("APP_DIR", ROOT_DIR.'/app');
    define("VENDOR_DIR", ROOT_DIR.'/vendor');
    define("CONFIG_DIR", APP_DIR.'/Configs');
    define("DOMAIN_DIR", APP_DIR.'/Domains');
    define("REPOSITORY_DIR", APP_DIR.'/Repositories');
    define("CONTROLLER_DIR", APP_DIR.'/Controllers');
    define('APPLICATION_ENV', getenv('APPLICATION_ENV') ?: 'development');

    require VENDOR_DIR.'/autoload.php';

    $loader = new \Phalcon\Loader();
    $loader->registerNamespaces(['CMS' => APP_DIR.'/']);
    $loader->register();

    // Configs
    $configPath = CONFIG_DIR.'/default.php';

    if (!is_readable($configPath)) {
        throw new Exception('Unable to read config from '.$configPath);
    }

    $config = new Phalcon\Config(include_once $configPath);

    $envConfigPath = CONFIG_DIR.'/server.'.APPLICATION_ENV.'.php';

    if (!is_readable($envConfigPath)) {
        throw new Exception('Unable to read config from '.$envConfigPath);
    }

    $override = new Phalcon\Config(include_once $envConfigPath);
    $config = $config->merge($override);

    $di = new CMS\Extensions\FactoryDefault();
    $app = new CMS\Extensions\Api($di);

    $bootstrap = new CMS\Bootstrap(
        new CMS\Bootstraps\RouterBootstrap,
        new CMS\Bootstraps\ServiceBootstrap,
        new CMS\Bootstraps\MiddlewareBootstrap
    );
    $bootstrap->run($app, $di, $config);

    $app->handle();

    // Set appropriate response value
    $response = $app->di->getShared(CMS\Constants\Services::RESPONSE);

    $returnedValue = $app->getReturnedValue();

    if($returnedValue !== null) {
        if (is_string($returnedValue)) {
            $response->setContent($returnedValue);
        } else {
            $response->setJsonContent($returnedValue);
        }
    }
} catch (\Exception $e) {
    // Handle exceptions
    $di = $app && $app->di ? $app->di : new CMS\Extensions\FactoryDefault();
    $response = $di->getShared(CMS\Constants\Services::RESPONSE);
    if(!$response || !$response instanceof CMS\Extensions\Response){
        $response = new CMS\Extensions\Response();
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
