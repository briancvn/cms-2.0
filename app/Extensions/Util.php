<?php

namespace CMS\Extensions;

class Util
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
}
