<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document (repositoryClass="CMS\Repositories\UserRepository") */
class User
{
    /** @ODM\Id */
    public $Id;

    /** @ODM\Field(type="string") */
    public $Role;

    /** @ODM\Field(type="string") */
    public $Email;

    /** @ODM\Field(type="string") */
    public $Username;

    /** @ODM\Field(type="string") */
    public $Password;

    /** @ODM\Field(type="string") */
    public $FirstName;

    /** @ODM\Field(type="string") */
    public $LastName;
}