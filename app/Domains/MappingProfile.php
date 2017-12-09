<?php
namespace CMS\Domains;

use AutoMapperPlus\Configuration\AutoMapperConfig;

use CMS\Domains\User;
use CMS\Contracts\UserDto;
use CMS\Contracts\AuthRequestDto;

class MappingProfile
{
    public static function mappingConfig(AutoMapperConfig $mapper)
    {
        $mapper->registerMapping(User::class, UserDto::class)->reverseMap();
        $mapper->registerMapping(\stdClass::class, AuthRequestDto::class);
    }
}