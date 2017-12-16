<?php

namespace CMS\Extensions;

class WarningException extends \Exception
{
    public function __construct($code, $message = null)
    {
        parent::__construct($message, $code);
    }
}
