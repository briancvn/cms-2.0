<?php

namespace Test\Services;

class UserServiceTest extends \Test\BaseTestCase
{

    /** @Inject('CMS\Services\UserService') */
    protected $userService;

    public function testTestCase()
    {
        $this->assertEquals(
            "works",
            "works",
            "This is OK"
        );

    }
}