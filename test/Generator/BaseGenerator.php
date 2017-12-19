<?php

namespace Test\Generator;

abstract class BaseGenerator
{
    public function __construct() {
        $this->start();
    }

    public function clean() {
        $this->end();
    }

    protected function start() {}
    protected function end() {}
}