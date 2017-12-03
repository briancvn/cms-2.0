<?php

namespace CMS\Controllers;

use CMS\Services\PeopleService;
use CMS\Services\UserService;

class UserController extends ApiController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
    }

    public function index()
    {
        return 'TEST PeopleController 1';
    }

    public function test()
    {
        return $this->peopleService->test();
    }
}
