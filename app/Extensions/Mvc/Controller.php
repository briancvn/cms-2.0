<?php

namespace CMS\Extensions\Mvc;

use Phalcon\Di\Injectable;
use Phalcon\Mvc\ControllerInterface;

abstract class Controller extends Injectable implements ControllerInterface
{
    public function __construct()
    {
        if (method_exists($this, "onConstruct")) {
            $this->{"onConstruct"}();
        }
    }
}