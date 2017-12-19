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

    /** @ODM\Field(type="int") */
    public $Pin;

    /** @ODM\Field(type="string") */
    public $Password;

    /** @ODM\Field(type="collection") */
    public $RoleGroups;

    /** @ReferenceOne(targetDocument="CMS\Domains\Profile", cascade="all") */
    public $Profile;
}