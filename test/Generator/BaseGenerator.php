<?php

namespace Test\Generator;

abstract class BaseGenerator
{
    public function init() {
        $this->start();
    }

    public function clean() {
        $this->end();
    }

    protected function start() {}
    protected function end() {}
}