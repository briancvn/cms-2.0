<?php
namespace CMS\Repositories;

class ReferenceDataRepository extends BaseRepository {
    public function getReferenceDataList(array $kinds)
    {
        return $this->createQueryBuilder()
            ->field('Kind')
            ->in($kinds)
            ->eagerCursor(true)
            ->getQuery()
            ->execute();
    }
}