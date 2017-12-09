<?php
namespace CMS\Extensions\Mapper;

use AutoMapperPlus\AutoMapperInterface;
use AutoMapperPlus\AutoMapper;

use CMS\Extensions\Util;

class Manager extends AutoMapper {

    public static function initialize(callable $configurator): AutoMapperInterface
    {
        $mapper = parent::initialize($configurator);
        $configuration = $mapper->getConfiguration();
        foreach (Util::scanNamespaces('CMS\Contracts', CONTRACTS_DIR) as $dtoName) {
            $configuration->registerMapping(\stdClass::class, $dtoName);
        }
        return $mapper;
    }
}
