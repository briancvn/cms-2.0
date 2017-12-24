<?php

namespace CMS\Controllers;

use CMS\Contracts\ReferenceDataCollectionRequestDto;
use CMS\Contracts\ReferenceDataCollectionResultDto;
use CMS\Services\ReferenceDataService;

class ReferenceDataController extends ApiController
{
    private $referenceDataService;

    public function __construct(ReferenceDataService $referenceDataService)
    {
        parent::__construct();
        $this->referenceDataService = $referenceDataService;
    }

    /** @Post */
    public function GetReferenceDataList(ReferenceDataCollectionRequestDto $requestDto): ReferenceDataCollectionResultDto
    {
        return $this->referenceDataService->getReferenceDataList($requestDto);
    }
}
