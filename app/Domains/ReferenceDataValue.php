<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use CMS\Common\AbstractClass;

/** @ODM\Document */
class ReferenceDataValue extends AbstractClass
{
    /** @ODM\Field(type="string") */
    public $Code;

    /** @ODM\Field(type="string") */
    public $Text;

    /** @ODM\Field(type="raw") */
    public $Properties;
}