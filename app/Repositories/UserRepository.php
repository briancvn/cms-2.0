<?php
namespace CMS\Repositories;

class UserRepository extends BaseRepository {
    public function findOneByAuthRequest(string $username)
    {
        $qb = $this->createQueryBuilder();
        $query = $qb->addOr($qb->expr()->field('Username')->equals($username))
            ->addOr($qb->expr()->field('Email')->equals($username))
            ->addOr($qb->expr()->field('Pin')->equals((int)$username))
            ->getQuery();
        return $query
            ->execute()
            ->getSingleResult();
    }
}