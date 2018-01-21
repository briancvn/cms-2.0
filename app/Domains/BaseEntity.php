<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use CMS\Common\AbstractClass;

class BaseEntity extends AbstractClass
{
    /** @ODM\Id */
    public $Id;

    /** @ODM\Version @ODM\Field(type="int") */
    public $Version;
}