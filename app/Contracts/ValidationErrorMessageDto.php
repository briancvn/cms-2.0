<?php
namespace CMS\Contracts;

class ValidationErrorMessageDto
{
    public $Property;
    public $Message;

    public function __construct(string $property, string $message) {
        $this->Property = $property;
        $this->Message = $message;
    }
}