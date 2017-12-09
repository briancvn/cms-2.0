<?php
namespace CMS\Domains;

use AutoMapperPlus\Configuration\AutoMapperConfig;

use CMS\Domains\User;
use CMS\Contracts\UserDto;

class MappingProfile
{
    public static function mappingConfig(AutoMapperConfig $mapper)
    {
        $mapper->registerMapping(User::class, UserDto::class)->reverseMap();
    }
}