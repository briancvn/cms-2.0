<?php
namespace CMS\Extensions\Cache;

use CMS\Extensions\Util;
use CMS\Extensions\Cache\ActionCache;
use CMS\Extensions\Cache\ControllerCache;

class Manager
{
    private $controllers = array();

    public function addController(ControllerCache $controller): void {
        array_push($this->controllers, $controller);
    }

    public function getControllerAction(string $controllerName, string $actionName): ActionCache {
        $controller = Util::array_find($this->controllers, function(ControllerCache $controller) use($controllerName) {
            return  $controller->name === $controllerName;
        });

        return $controller ? $controller->getAction($actionName) : null;
    }
}