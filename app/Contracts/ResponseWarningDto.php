<?php
namespace CMS\Contracts;

use CMS\Extensions\Exception;

class ResponseWarningDto
{
    public $Message;
    public $Code;

    public function __construct(\Exception $e) {
        $this->Message = $e->getMessage();
        $this->Code = $e->getCode();
    }
}