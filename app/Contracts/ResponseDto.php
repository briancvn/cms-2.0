<?php
namespace CMS\Contracts;

use CMS\Constants\ResponseErrorKind;

class ResponseDto
{
    public $Result;
    public $StatusCode;
    public $Errors = array();
    public $ErrorKind;
    public $ErrorTitle;

    public function __construct($result,
                                int $statusCode = 200,
                                array $errors = array(),
                                ResponseErrorKind $errorKind = null,
                                string $errorTitle = null) {
        $this->Result = $result;
        $this->StatusCode = $statusCode;
        $this->Errors = $errors;
        $this->ErrorKind = $errorKind;
        $this->ErrorTitle = $errorTitle;
    }
}