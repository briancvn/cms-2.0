<?php
namespace CMS\Contracts;

use CMS\Common\AbstractClass;

class ReferenceDataDto extends AbstractClass
{
    public $Kind;
    public $ReferenceDataValues = array();
}