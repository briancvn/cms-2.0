<?php
namespace CMS\Contracts;

class BaseDto
{
    public function __construct(array $properties = null)
    {
        foreach ($properties as $property => $value)
        {
            $this->$property = $value;
        }
    }
}