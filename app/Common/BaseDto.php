<?php
namespace CMS\Common;

abstract class AbstractClass
{
    public function __construct(array $properties = null)
    {
        foreach ($properties as $property => $value)
        {
            $this->$property = $value;
        }
    }
}