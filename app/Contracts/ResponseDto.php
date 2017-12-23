<?php
namespace CMS\Contracts;

use CMS\Contracts\ResponseErrorDto;
use CMS\Contracts\ResponseWarningDto;
use CMS\Common\AbstractClass;

class ResponseDto extends AbstractClass
{
    public $Result;

    /** @var ResponseErrorDto */
    public $Error;

    /** @var ResponseWarningDto */
    public $Warning;
}