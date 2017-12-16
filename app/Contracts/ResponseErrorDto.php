<?php
namespace CMS\Contracts;

class ResponseErrorDto
{
    public $Message;
    public $Title = '500 Internal Server Error';
    public $Code;

    public function __construct(\Exception $e) {
        $this->Message = $e->getMessage();
        $this->Code = $e->getCode();
    }
}