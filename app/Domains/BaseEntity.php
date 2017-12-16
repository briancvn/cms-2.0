<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

class BaseEntity
{
    /** @ODM\Id */
    protected $Id;

    public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    public function __set($property, $value) {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
        return $this;
    }

    public function __isset( $name )
    {
        return method_exists( $this , 'get' . ucfirst( $name  ) )
            || method_exists( $this , 'set' . ucfirst( $name  ) );
    }
}