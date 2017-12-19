<?php

namespace Test\Generator;

use CMS\Repositories\UserRepository;

class UserGenerator extends BaseGenerator
{
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        parent::__construct();
        $this->userRepository = $userRepository;
    }

    public function create()
    {
        $this->assertEquals(
            "works",
            "works",
            "This is OK"
        );

    }
}