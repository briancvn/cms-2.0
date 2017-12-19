<?php
namespace CMS\Contracts;

use CMS\Contracts\ResponseErrorDto;
use CMS\Contracts\ResponseWarningDto;

class ResponseDto extends CMS\Common\AbstractClass
{
    public $Result;

    /** @var ResponseErrorDto */
    public $Error;

    /** @var ResponseWarningDto */
    public $Warning;
}