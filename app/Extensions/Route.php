<?php
namespace CMS\Extensions;

use Phalcon\Exception;
use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\DiInterface;
use Phalcon\Annotations\Adapter\Memory as MemoryAnnAdaptor;

use CMS\Extensions\Api;
use CMS\Constants\HttpMethods;
use CMS\Constants\AnnotationConstants;
use CMS\Constants\Services;
use CMS\Extensions\Cache\ActionCache;
use CMS\Extensions\Cache\ControllerCache;
use CMS\Extensions\Cache\Manager as CacheManager;

class Route {
    protected $app;
    protected $di;
    protected $cache;
    protected $collections = array();
    protected $namespaces = array();
    protected $ourLoader;

    public function __construct(Api $app, DiInterface $di) {
        $this->app = $app;
        $this->di = $di;
        $this->cache = $di->get(CacheManager::class);
    }

    /**
     * Add a controller directory that does not have namespaced controllers
     *
     * @param $dir
     */
    public function addControllerDirectory($dir) {
        $this->addControllerNamespace('', $dir);
    }

    /**
     * Add a controller directory for namespaced controllers
     *
     * @param $namespace
     * @param $dir
     */
    public function addControllerNamespace($namespace, $dir) {
        $this->namespaces[] = array(
            'ns' => $namespace,
            'dir' => $dir,
        );
    }

    /**
     * If the class isn't already loaded, and an autoloader hasn't been set up
     * for the class (i.e. class not loaded), we will set up our own autoloader
     * for all namespaces and dirs registered and attempt to load the class
     *
     * @param $className
     * @throws Exception
     */
    protected function autoloadClass($className) {
        // has the class be loaded?
        if (class_exists($className)) {
            return;
        }

        if (!$this->ourLoader) {
            $this->ourLoader = new Loader();
            $ourLoaderNamespaces = array();
            $ourLoaderDirs = array();

            foreach ($this->namespaces as $ns) {
                if ($ns['ns']) {
                    $ourLoaderNamespaces[$ns['ns']] = $ns['dir'];
                }
                else {
                    $ourLoaderDirs[] = $ns['dir'];
                }

            }

            $this->ourLoader->registerNamespaces($ourLoaderNamespaces);
            $this->ourLoader->registerDirs($ourLoaderDirs);
        }

        $loaded = $this->ourLoader->autoLoad($className);

        if (!$loaded) {
            throw new \Exception('Unable to load autoload class ' . $className);
        }
    }

    /**
     * Scan the added namespaces/directories, create appropriate micro collections
     *
     * @throws \Exception
     */
    protected function scanNamespaces() {
        $reader = new MemoryAnnAdaptor();

        foreach ($this->namespaces as $ns) {
            $scan = scandir($ns['dir']);

            $controllersCache = $this->cache->getControllers();
            $cacheController = empty($controllersCache);
            foreach ($scan as $f) {
                $ff = $ns['dir'] . DIRECTORY_SEPARATOR . $f;
                $info = pathinfo($ns['dir'] . PATH_SEPARATOR . $f);

                // make sure we're working with a php file
                if (!is_file($ff) || $info['extension'] != 'php')
                    continue;

                // OK, let's get the fully qualified class name
                $className = $ns['ns'] . '\\' . substr($f, 0, -(strlen($info['extension']) + 1));

                $classRef = new \ReflectionClass($className);
                if ($classRef->isAbstract())
                    continue;

                $this->autoloadClass($className);
                $reflector = $reader->get($className);
                $methodsAnnotations = $reflector->getMethodsAnnotations();
                $curPrefix = '/'.str_replace('Controller','', $classRef->getShortName());
                $controllerCache = $cacheController ? new ControllerCache($classRef->getName()) : null;
                foreach ($classRef->getMethods() as $methodRef) {
                    if ($methodRef->isConstructor() || !$methodRef->isPublic())
                        continue;

                    $function = $methodRef->getName();
                    $uri = $curPrefix.'/'.$function;
                    $httpMethod = HttpMethods::GET;
                    $ignore = false;
                    if ($methodsAnnotations && !empty($methodsAnnotations[$function])) {
                        foreach ($methodsAnnotations[$function] as $annotation) {
                            if ($annotation->getName() === AnnotationConstants::CONTROLLER_ACTION_IGNORE) {
                                $ignore = true;
                                break;
                            }

                            if (in_array(strtoupper($annotation->getName()), HttpMethods::$ALL_METHODS)) {
                                $httpMethod = strtoupper($annotation->getName());
                                break;
                            }
                        }
                    }

                    if (!$ignore) {
                        $this->updateCollection($className, $function, $uri, $httpMethod);
                        $parameters = $methodRef->getParameters();
                        $paramType = empty($parameters) ? null : $parameters[0]->getType()->getName();
                        if ($controllerCache) {
                            $controllerCache->addAction(new ActionCache($function, $paramType));
                        }
                    }
                }
                if ($cacheController) {
                    array_push($controllersCache, $controllerCache);
                }
            }
            if ($cacheController) {
                $this->cache->setControllers($controllersCache);
            }
        }
    }

    /**
     * Create or append the method, uri, and http method to the className
     *
     * @param $className
     * @param $classMethod
     * @param $uri
     * @param $httpMethod
     */
    protected function updateCollection($className, $classMethod, $uri, $httpMethod) {
        if (!isset($this->collections[$className])) {
            $this->collections[$className] = new Micro\Collection();
            $handler = $this->di->get($className);
            if ($handler) {
                $this->collections[$className]->setHandler($handler);
            } else {
                $this->collections[$className]->setHandler($className)->setLazy(true);
            }
        }

        // always remove trailing slash
        while (strlen($uri) > 0 && substr($uri, -1) == '/') {
            $uri = substr($uri, 0, -1);
        }

        $verb = strtolower($httpMethod);
        $this->collections[$className]->$verb($uri, 'callAction', $classMethod);
    }

    /**
     * Mount all collections
     */
    public function mount() {
        $this->scanNamespaces();

        foreach ($this->collections as $col) {
            $this->app->mount($col);
        }
    }
}
