<?php

namespace CMS\Controllers;

use CMS\Contracts\ResourceRequestDto;
use CMS\Contracts\ResourceResultDto;
use CMS\Services\ResourceService;

class ResourceController extends ApiController
{
    private $resourceService;

    public function __construct(ResourceService $resourceService)
    {
        parent::__construct();
        $this->resourceService = $resourceService;
    }

    /** @Post */
    public function GetResources(ResourceRequestDto $requestDto): ResourceResultDto
    {
        return $this->resourceService->getResources($requestDto);
    }
}
