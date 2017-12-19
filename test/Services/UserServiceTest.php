<?php

namespace Test\Services;

use Test\Generator\UserGenerator;

class UserServiceTest extends \Test\BaseTestCase
{
    /**
     * @var UserGenerator
     * @Inject(Test\Generator\UserGenerator)
     */
    protected $userGenerator;

    public function testTestCase()
    {
        $this->assertEquals(
            "works",
            "works",
            "This is OK"
        );
    }
}