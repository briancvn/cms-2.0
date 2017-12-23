<?php
namespace CMS\Contracts;

use CMS\Common\AbstractClass;
use CMS\Contracts\ResponseErrorDto;
use CMS\Contracts\ResponseWarningDto;
use CMS\Contracts\ResponseValidationDto;

class ResponseDto extends AbstractClass
{
    public $Result;

    /** @var ResponseErrorDto */
    public $Error;

    /** @var ResponseWarningDto */
    public $Warning;

    /** @var ResponseValidationDto */
    public $ValidationErrors = array();
}