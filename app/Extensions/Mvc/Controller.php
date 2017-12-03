<?php

namespace CMS\Extensions\Mvc;

use Phalcon\Mvc\ControllerInterface;

abstract class Controller implements ControllerInterface
{
    public function __construct()
    {
        if (method_exists($this, "onConstruct")) {
            $this->{"onConstruct"}();
        }
    }
}