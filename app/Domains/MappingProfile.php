<?php
namespace CMS\Domains;

use AutoMapperPlus\Configuration\AutoMapperConfig;

use CMS\Domains\Profile;
use CMS\Domains\ReferenceData;
use CMS\Contracts\ProfileDto;
use CMS\Contracts\ReferenceDataDto;
use CMS\Contracts\SearchCriteriaDto;
use CMS\Contracts\SearchResultDto;
use CMS\Domains\SearchCriteria;
use CMS\Domains\SearchResult;
use CMS\Extensions\Mapper\Manager as MapperManager;

class MappingProfile
{
    public static function mappingConfig(AutoMapperConfig $mapperConfig, MapperManager $mapper)
    {
        $mapperConfig->registerMapping(User::class, User::class)
            ->forMember('Profile', function (User $source) use($mapper) {
                return $mapper->map($source->Profile, Profile::class);
            });
        $mapperConfig->registerMapping('Proxies\\__CG__\\'.Profile::class, Profile::class);
        $mapperConfig->registerMapping(Profile::class, ProfileDto::class)->reverseMap();
        $mapperConfig->registerMapping(ReferenceData::class, ReferenceDataDto::class)->reverseMap();
        $mapperConfig->registerMapping(SearchCriteriaDto::class, SearchCriteria::class);
        $mapperConfig->registerMapping(SearchResult::class, SearchResultDto::class);
    }
}