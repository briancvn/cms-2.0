<?php
namespace CMS\Contracts;

use CMS\Contracts\ResponseErrorDto;
use CMS\Contracts\ResponseWarningDto;

class ResponseDto
{
    public $Result;

    /** @var ResponseErrorDto */
    public $Error;

    /** @var ResponseWarningDto */
    public $Warning;

    public function __construct($result = null) {
        $this->Result = $result;
    }
}