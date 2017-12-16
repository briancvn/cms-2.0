<?php
namespace CMS\Contracts;

class ResponseDto
{
    public $Result;
    public $Error;

    public function __construct($result = null) {
        $this->Result = $result;
    }
}