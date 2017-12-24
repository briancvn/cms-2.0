<?php
namespace CMS\Domains;

use AutoMapperPlus\Configuration\AutoMapperConfig;

use CMS\Domains\Profile;
use CMS\Domains\ReferenceData;
use CMS\Contracts\ProfileDto;
use CMS\Contracts\ReferenceDataDto;

class MappingProfile
{
    public static function mappingConfig(AutoMapperConfig $mapper)
    {
        $mapper->registerMapping('Proxies\\__CG__\\'.Profile::class, ProfileDto::class)->reverseMap();
        $mapper->registerMapping(ReferenceData::class, ReferenceDataDto::class)->reverseMap();
    }
}