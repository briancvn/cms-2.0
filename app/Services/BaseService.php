<?php
namespace CMS\Services;

use Phalcon\Annotations\Adapter\Memory as MemoryAnnAdaptor;
use Underscore\Types\Arrays;

use CMS\Extensions\Auth\Manager as AuthManager;
use CMS\Extensions\Mapper\Manager as MapperManager;
use CMS\Constants\AnnotationConstants;
use CMS\Constants\ErrorCodes;
use CMS\Extensions\WarningException;

abstract class BaseService
{
    /** @var AuthManager */
    protected $authManager;

    /** @var MapperManager */
    protected $mapper;

    public function setAuthManager(AuthManager $authManager) {
        $this->authManager = $authManager;
    }

    public function setMapper(MapperManager $mapper) {
        $this->mapper = $mapper;
    }

    public function __call($name, $arguments)
    {
        $reader = new MemoryAnnAdaptor();
        $reflector = $reader->get($this);
        $methodsAnnotations = $reflector->getMethodsAnnotations();
        if (!empty($methodsAnnotations[$name])) {
            $annotation = Arrays::find($methodsAnnotations[$name]->getAnnotations(), function($annotation) {
                return $annotation->getName() === AnnotationConstants::ACCESS_ROLES;
            });

            if ($annotation && !$this->authManager->isValidBusinessItems($annotation->getArguments())) {
                throw new WarningException(ErrorCodes::NOT_ACCEPTABLE, 'NOT_ACCEPTABLE');
            }
        }

        return $this->$name($arguments);
    }
}