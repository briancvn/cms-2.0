<?php
namespace CMS\Contracts;

use CMS\Common\AbstractClass;
use CMS\Constants\CommonConstants;

class ResourceRequestDto extends AbstractClass
{
    public $Language = CommonConstants::DEFAULT_LANGUAGE;
    public $Resources = array();
}