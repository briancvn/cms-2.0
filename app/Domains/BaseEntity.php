<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

class BaseEntity
{
    /** @ODM\Id */
    public $Id;
}