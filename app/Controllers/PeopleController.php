<?php

namespace CMS\Controllers;

use CMS\Services\PeopleService;

/**
 * @RoutePrefix("/people")
 */
class PeopleController extends ApiController
{
    private $peopleService;

    public function __construct(PeopleService $peopleService)
    {
        parent::__construct();
        $this->peopleService = $peopleService;
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
