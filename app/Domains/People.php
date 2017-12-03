<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document (repositoryClass="CMS\Repositories\PeopleRepository") */
class People
{
    /** @ODM\Id */
    private $Id;

    /** @ODM\Field(type="string") */
    private $FirstName;

    /** @ODM\Field(type="string") */
    private $LastName;
}