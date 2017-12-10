<?php
namespace CMS\Contracts;

class ResponseErrorDto
{
    public $Type;
    public $Error;
    public $ErrorDetails = array();
    public $ValidationErrors= array();

    public function __construct(string $type, string $error, array $errorDetails = array(), array $validationErrors = array()) {
        $this->Type = $type;
        $this->Error = $type;
        $this->ErrorDetails = $errorDetails;
        $this->ValidationErrors = $validationErrors;
    }
}