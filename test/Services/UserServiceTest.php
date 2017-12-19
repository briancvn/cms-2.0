<?php

namespace Test\Services;

class UserServiceTest extends \Test\BaseTestCase
{
    /** @Inject('Test\Generator\UserGenerator') */
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