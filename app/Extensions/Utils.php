<?php

namespace CMS\Extensions;

use Underscore\Types\Arrays;

use CMS\Constants\CommonConstants;

class Utils
{
    public static function scanNamespaces(string $namespaces, string $dir): array
    {
        $result = [];
        $scan = scandir($dir);
        foreach ($scan as $f) {
            $ff = $dir.DIRECTORY_SEPARATOR.$f;
            $info = pathinfo($dir.PATH_SEPARATOR.$f);

            // make sure we're working with a php file
            if (!is_file($ff) || $info['extension'] != 'php')
                continue;

            // OK, let's get the fully qualified class name
            $className = $namespaces.'\\'.substr($f, 0, -(strlen($info['extension']) + 1));
            $classRef = new \ReflectionClass($className);
            if (!$classRef->isAbstract()) {
                array_push($result, $className);
            }
        }

        return $result;
    }

    public static function array_find(array $arr, $findFunc)
    {
        $result = null;
        foreach ($arr as $item) {
            if ($findFunc($item)) {
                $result = $item;
                break;
            }
        }
        return $result;
    }

    public static function getBusinessItemsFromBusinessRole(\DOMElement $accessControl, \DOMElement $businessRoleRef): array
    {
        $result = array();
        $businessRole = Arrays::find($accessControl->getElementsByTagName(CommonConstants::BUSINESS_ROLE_TAG), function(\DOMElement $item) use ($businessRoleRef) {
            return  $item->getAttribute(CommonConstants::BUSINESS_ATTR) === $businessRoleRef->getAttribute(CommonConstants::BUSINESS_ATTR);
        });

        foreach ($businessRole->getElementsByTagName(CommonConstants::BUSINESS_ITEM_REF_TAG) as $businessItemRef) {
            $hasBusinessItem = Arrays::has($accessControl->getElementsByTagName(CommonConstants::BUSINESS_ITEM_TAG), function(\DOMElement $item) use ($businessItemRef) {
                return  $item->getAttribute(CommonConstants::BUSINESS_ATTR) === $businessItemRef->getAttribute(CommonConstants::BUSINESS_ATTR);
            });
            if ($hasBusinessItem) {
                array_push($result, $businessItemRef->getAttribute(CommonConstants::BUSINESS_ATTR));
            }
        }

        foreach ($businessRole->getElementsByTagName(CommonConstants::BUSINESS_ROLE_REF_TAG) as $roleRef) {
            $result = array_merge($result, Utils::getBusinessItemsFromBusinessRole($accessControl, $roleRef));
        }
        return $result;
    }

    public static function getBusinessItemsFromBusinessGroup(\DOMElement $accessControl, \DOMElement $businessGroup): array
    {
        $result = array();
        foreach ($businessGroup->getElementsByTagName(CommonConstants::BUSINESS_ROLE_REF_TAG) as $businessRoleRef) {
            $result = array_merge($result, Utils::getBusinessItemsFromBusinessRole($accessControl, $businessRoleRef));
        }
        foreach ($businessGroup->getElementsByTagName(CommonConstants::BUSINESS_ROLE_GROUP_REF_TAG) as $businessGroupRef) {
            $result = array_merge($result, Utils::getBusinessItemsFromBusinessGroup($accessControl, $businessGroupRef));
        }
        return $result;
    }

    public static function getDeepValue($obj, $path)
    {
        $pathArr = is_array($path) ? $path : explode('.', $path);
        $value = $obj[array_shift($pathArr)];
        if ($value && !empty($pathArr)) {
            return Utils.getDeepValue($value, $pathArr);
        }
        return $value;
    }
}
