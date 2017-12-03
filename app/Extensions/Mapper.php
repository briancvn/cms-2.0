<?php
namespace CMS\Extensions;

use AutoMapperPlus\AutoMapper;
use CMS\Domains\MappingProfile;

class Mapper extends AutoMapper
{
    public function __construct()
    {
        $config = new MapperConfig();
        MappingProfile::mappingConfig($config);
        parent::__construct($config);
    }
}
