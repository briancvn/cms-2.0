<?php
namespace CMS\Domains;

use CMS\Common\AbstractClass;

class SearchCriteria extends AbstractClass
{
    public $Skip;
    public $Limit;

    /** @var Sort */
    public $Sort;

    /** @var Filter */
    public $Filter;
}