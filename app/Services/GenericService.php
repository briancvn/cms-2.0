<?php
namespace CMS\Services;

use CMS\Contracts\SearchCriteriaDto;
use CMS\Contracts\SearchResultDto;
use CMS\Domains\SearchCriteria;
use CMS\Domains\SearchResult;
use CMS\Repositories\BaseRepository;

abstract class GenericService extends BaseService
{
    protected $repository;
    protected $dtoType;

    public function __construct(BaseRepository $repository, $dtoType) {
        $this->repository = $repository;
        $this->dtoType = $dtoType;
    }

    public function Search(SearchCriteriaDto $criteria): SearchResultDto
    {
        return $this->mapper->map($this->repository->Search($this->mapper->map($criteria, SearchCriteria::class)), SearchResultDto::class);
    }

    public function FindById(string $id)
    {
        return $this->mapper->map($this->repository->FindById($id), $this->dtoType);
    }
}