<?php
namespace CMS\Repositories;

use Doctrine\ODM\MongoDB\DocumentRepository;

class PeopleRepository extends DocumentRepository
{
    public function test()
    {
        return 'test';
    }
}