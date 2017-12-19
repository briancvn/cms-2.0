<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

class BaseEntity extends CMS\Common\AbstractClass
{
    /** @ODM\Id */
    public $Id;
}