<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Doctrine\ODM\MongoDB\Mapping\Annotations\ReferenceOne;

/** @ODM\Document(repositoryClass="CMS\Repositories\UserRepository") */
class User extends BaseEntity
{
    /** @ODM\Field(type="string") */
    public $Username;

    /** @ODM\Field(type="string") */
    public $Email;

    /** @ODM\Field(type="string") */
    public $Phone;

    /** @ODM\Field(type="string") */
    public $Password;

    /** @ODM\Field(type="string") */
    public $Role;

    /** @ReferenceOne(targetDocument="CMS\Domains\Profile") */
    public $Profile;
}