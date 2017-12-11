<?php
namespace CMS\Domains;

use AutoMapperPlus\Configuration\AutoMapperConfig;

use CMS\Domains\Profile;
use CMS\Contracts\ProfileDto;

class MappingProfile
{
    public static function mappingConfig(AutoMapperConfig $mapper)
    {
        $mapper->registerMapping('Proxies\\__CG__\\'.Profile::class, ProfileDto::class)->reverseMap();
    }
}