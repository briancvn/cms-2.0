<?php
namespace CMS\Extensions\Cache;

use Phalcon\Cache\Backend\File as BackFile;
use Phalcon\Cache\Frontend\Data as FrontData;
use Underscore\Types\Arrays;

use CMS\Extensions\Utils;
use CMS\Extensions\Cache\ActionCache;
use CMS\Extensions\Cache\ControllerCache;
use CMS\Constants\CacheConstants;
use CMS\Constants\CommonConstants;

class Manager
{
    private $cache;
    private $controllers = array();
    private $businessGroups = array();

    public function __construct() {
        $frontCache = new FrontData(['lifetime' => CacheConstants::LIFE_TIME]);
        $this->cache = new BackFile($frontCache, ['cacheDir' => CACHE_DIR]);
        $this->businessGroups = $this->getBusinessGroups();
        $this->controllers = $this->cache->get(CacheConstants::CONTROLLER_CACHE_KEY) ?? array();
    }

    public function reset(): void {
        $this->controllers = array();
        $this->businessGroups = array();
        $this->cache->delete(CacheConstants::CONTROLLER_CACHE_KEY);
        $this->cache->delete(CacheConstants::ACCESS_CONTROL_CACHE_KEY);
    }

    public function setControllers(array $controllers): void {
        $this->controllers = $controllers;
        $this->cache->save(CacheConstants::CONTROLLER_CACHE_KEY, $this->controllers);
    }

    public function getControllers(): array{
        return $this->controllers;
    }

    public function getControllerAction(string $controllerName, string $actionName): ActionCache {
        $controller = Utils::array_find($this->controllers, function(ControllerCache $controller) use($controllerName) {
            return  $controller->name === $controllerName;
        });

        return $controller ? $controller->getAction($actionName) : null;
    }

    public function isBusinessRoleGroupsValid(array $userBusinessRoleGroups, array $businessItemsCheck): bool {
        $businessItems = array();
        foreach ($userBusinessRoleGroups as $roleGroup) {
            $businessItems = array_merge($businessItems, $this->businessGroups[$roleGroup]);
        }
        return Arrays::matches($businessItemsCheck, function($item) use ($businessItems) {
            return Arrays::contains($businessItems, $item);
        });
    }

    private function getBusinessGroups(): array {
        $results = $this->cache->get(CacheConstants::ACCESS_CONTROL_CACHE_KEY) ?? array();
        if (empty($results)) {
            $accessControlDefinitions = new \DOMDocument();
            $accessControlDefinitions->load(ACCESS_DINIFITIONS_PATH);
            $accessControl = $accessControlDefinitions->getElementsByTagName(CommonConstants::ACCESS_CONTROL_TAG)[0];

            $businessGroups = array();
            foreach ($accessControl->getElementsByTagName(CommonConstants::BUSINESS_ROLE_GROUP_TAG) as $businessGroup) {
                $results[$businessGroup->getAttribute(CommonConstants::BUSINESS_ATTR)] = Arrays::unique(Utils::getBusinessItemsFromBusinessGroup($accessControl, $businessGroup));
            }
            $this->cache->save(CacheConstants::ACCESS_CONTROL_CACHE_KEY, $businessGroups);

        }
        return $results;
    }
}