<?php
namespace CMS\Repositories;

use Doctrine\ODM\MongoDB\DocumentRepository;
use CMS\Domains\SearchCriteria;
use CMS\Domains\SearchResult;
use CMS\Extensions\Utils;

class BaseRepository extends DocumentRepository {
    public function Search(SearchCriteria $criteria): SearchResult
    {
        $query = $this->createQueryBuilder();
        if (isset($criteria->Sort)) {
            $query->sort($criteria->Sort->Field, $criteria->Sort->Dir);
        }

        $total = $query
            ->count()
            ->getQuery()
            ->execute();
        $results = $query
            ->find()
            ->limit($criteria->Limit)
            ->skip($criteria->Skip)
            ->getQuery()
            ->execute();
        return new SearchResult([
            Results => Utils::toArray($results),
            Total => $total
        ]);
    }

    public function FindById(string $id)
    {
        return $this->find($id);
    }
}