<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Doctrine\ODM\MongoDB\Mapping\Annotations\ReferenceOne;

/** @ODM\Document(repositoryClass="CMS\Repositories\UserRepository") */
class User extends BaseEntity
{
    /** @ODM\Field(type="string") */
    protected $Username;

    /** @ODM\Field(type="string") */
    protected $Email;

    /** @ODM\Field(type="string") */
    protected $Phone;

    /** @ODM\Field(type="int") */
    protected $Pin;

    /** @ODM\Field(type="string") */
    protected $Password;

    /** @ODM\Field(type="collection") */
    protected $RoleGroups;

    /** @ReferenceOne(targetDocument="CMS\Domains\Profile") */
    protected $Profile;
}