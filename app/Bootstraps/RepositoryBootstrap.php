<?php

namespace CMS\Bootstraps;

use Phalcon\Config;
use Phalcon\DiInterface;
use Doctrine\Common\Annotations\AnnotationReader;

use CMS\BootstrapInterface;
use CMS\Extensions\Api;
use CMS\Extensions\Util;
use CMS\Constants\Services;

class RepositoryBootstrap implements BootstrapInterface
{
    public function run(Api $api, DiInterface $di, Config $config)
    {
        foreach (Util::scanNamespaces('CMS\Domains', DOMAINS_DIR) as $domain) {
            $arguments = [];
            $annotationReader = new AnnotationReader();
            $reflectionClass = new \ReflectionClass($domain);
            $classAnnotations = $annotationReader->getClassAnnotations($reflectionClass);
            $annotation = Util::array_find($classAnnotations, function($item) {
                return !empty($item->repositoryClass);
            });

            if ($annotation) {
                $di->set($annotation->repositoryClass, function () use ($di, $domain) {
                    return $di->get(Services::DOCUMENT_MANAGER)->getRepository($domain);
                });
            }
        }
    }
}
