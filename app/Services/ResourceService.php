<?php
namespace CMS\Services;

use CMS\Contracts\ResourceRequestDto;
use CMS\Contracts\ResourceResultDto;

class ResourceService extends BaseService
{
    protected function getResources(ResourceRequestDto $requestDto): ResourceResultDto
    {
        $resources = null;
        foreach ($requestDto->Resources as $resource) {
            $resources[$resource] = json_decode(file_get_contents(RESOURCES_DIR.'/'.$resource.'/'.$requestDto->Language.'.json'), true);
        }

        return new ResourceResultDto([
            Resources => $resources
        ]);
    }
}
