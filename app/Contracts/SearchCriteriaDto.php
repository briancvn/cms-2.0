<?php
namespace CMS\Contracts;

use CMS\Common\AbstractClass;

class SearchCriteriaDto extends AbstractClass
{
    public $Skip;
    public $Limit;

    /** @var SortDto */
    public $Sort;

    /** @var FilterDto */
    public $Filter;
}