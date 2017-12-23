<?php

namespace CMS\Extensions\Exception;

use CMS\Contracts\ResponseValidationDto;

class ValidationException extends \Exception
{
    private $Messages = array();

    public function __construct(string $message, string $property = null)
    {
        $this->addMessage($message, $property);
    }

    public function addMessage(string $message, string $property = null): void {
        array_push($this->Messages, new ResponseValidationDto([
            Message => $message,
            Property => $property
        ]));
    }

    public function getMessages(): array{
        return $this->Messages;
    }
}
