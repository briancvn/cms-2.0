<?php
namespace CMS\Domains;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Doctrine\ODM\MongoDB\Mapping\Annotations\ReferenceMany;

/** @ODM\Document(repositoryClass="CMS\Repositories\ReferenceDataRepository") */
class ReferenceData extends BaseEntity
{
    /** @ODM\Field(type="string") */
    public $Kind;

    /** @ODM\Field(type="collection") */
    public $ReferenceDataValues;
}