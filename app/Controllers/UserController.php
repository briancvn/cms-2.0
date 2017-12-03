<?php

namespace CMS\Controllers;

use CMS\Services\PeopleService;
use CMS\Services\UserService;

/**
 * @RoutePrefix("/user")
 */
class UserController extends ApiController
{
    /**
     * @var IPeopleService;
     */
    private $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
    }

//    public function setPeopleService(PeopleService $peopleService)
//    {
//        $this->peopleService = $peopleService;
//    }

    /**
     * @Get("/")
     */
    public function index()
    {
        return 'TEST PeopleController 1';
    }

    /**
     * @Get("/test")
     */
    public function test()
    {
        return $this->peopleService->test();
    }
}
