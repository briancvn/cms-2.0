<?php
namespace CMS\Domains;

use CMS\Extensions\MapperConfig;
use CMS\Domains\People;
use CMS\Contracts\PeopleDto;

class MappingProfile
{
    public static function mappingConfig(MapperConfig $mapper)
    {
        $mapper->registerMapping(People::class, PeopleDto::class)->reverseMap();
    }
}