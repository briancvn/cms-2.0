<?php
namespace CMS\Repositories;

use Doctrine\ODM\MongoDB\DocumentRepository;

class UserRepository extends DocumentRepository
{
    public function test()
    {
        return 'TEST UserRepository';
    }
}