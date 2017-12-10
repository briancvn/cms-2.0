<?php
namespace CMS\Extensions\Mapper;

use AutoMapperPlus\AutoMapperInterface;
use AutoMapperPlus\AutoMapper;
use Underscore\Types\Strings;

use CMS\Extensions\Util;
use CMS\Extensions\Auth\Session;

class Manager extends AutoMapper {

    public static function initialize(callable $configurator): AutoMapperInterface
    {
        $mapper = parent::initialize($configurator);
        $configuration = $mapper->getConfiguration();
        foreach (Util::scanNamespaces('CMS\Contracts', CONTRACTS_DIR) as $dtoName) {
            if (Strings::endsWith($dtoName, 'RequestDto')) {
                $configuration->registerMapping(\stdClass::class, $dtoName);
            }
        }
        return $mapper;
    }
}
