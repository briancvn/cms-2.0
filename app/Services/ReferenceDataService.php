<?php
namespace CMS\Services;

use CMS\Repositories\ReferenceDataRepository;
use CMS\Contracts\ReferenceDataCollectionRequestDto;
use CMS\Contracts\ReferenceDataCollectionResultDto;
use CMS\Contracts\ReferenceDataDto;

class ReferenceDataService extends BaseService
{
    /** @var ReferenceDataRepository */
    private $referenceDataRepository;

    public function __construct(ReferenceDataRepository $referenceDataRepository) {
        $this->referenceDataRepository = $referenceDataRepository;
    }

    protected function getReferenceDataList(ReferenceDataCollectionRequestDto $requestDto): ReferenceDataCollectionResultDto
    {
        $results = $this->referenceDataRepository->getReferenceDataList(array_map(function($kind) {
            return EReferenceDataKind[$kind];
        }, $requestDto->Kinds));
        return new ReferenceDataCollectionResultDto([
            Results => $this->mapper->mapMultiple($results->toArray(), ReferenceDataDto::class)
        ]);
    }
}
