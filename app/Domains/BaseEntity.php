<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

class BaseEntity
{
    /** @ODM\Id */
    public $Id;

    public function __construct(array $properties = null)
    {
        foreach ($properties as $property => $value)
        {
            $this->$property = $value;
        }
    }
}