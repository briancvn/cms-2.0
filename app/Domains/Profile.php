<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document(repositoryClass="CMS\Repositories\ProfileRepository") */
class Profile extends BaseEntity
{
    /** @ODM\Field(type="int") */
    protected $Pin;

    /** @ODM\Field(type="string") */
    protected $FirstName;

    /** @ODM\Field(type="string") */
    protected $LastName;

    /** @ODM\Field(type="date") */
    protected $Birthday;

    /** @ODM\Field(type="string") */
    protected $Gender;

    /** @ODM\Field(type="string") */
    protected $Language;
}