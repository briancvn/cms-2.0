<?php
namespace CMS\Extensions\Mapper;

use AutoMapperPlus\AutoMapperInterface;
use AutoMapperPlus\AutoMapper;
use Underscore\Types\Strings;

use CMS\Extensions\Utils;
use CMS\Extensions\Auth\Session;
use CMS\Contracts\ProfileDto;

class Manager extends AutoMapper {

    public static function initialize(callable $configurator): AutoMapperInterface
    {
        $mapper = new static;
        $configurator($mapper->getConfiguration(), $mapper);
        $configuration = $mapper->getConfiguration();
        $configuration->registerMapping('__PHP_Incomplete_Class', ProfileDto::class);
        foreach (Utils::scanNamespaces('CMS\Contracts', CONTRACTS_DIR) as $dtoName) {
            if (Strings::endsWith($dtoName, 'RequestDto')) {
                $configuration->registerMapping(\stdClass::class, $dtoName);
            }
        }
        return $mapper;
    }
}
