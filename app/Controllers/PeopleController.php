<?php

namespace CMS\Controllers;

use CMS\Services\PeopleService;
use CMS\Contracts\PeopleDto;
use CMS\Extensions\Mapper;

/**
 * @RoutePrefix("/people")
 */
class PeopleController extends ApiController
{
    private $mapper;
    private $peopleService;

    public function __construct(Mapper $mapper, PeopleService $peopleService)
    {
        parent::__construct();
        $this->mapper = $mapper;
        $this->peopleService = $peopleService;
    }

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
    public function test(): array
    {
        $test = $this->peopleService->test();
        $test1 = $this->mapper->mapMultiple($test, PeopleDto::class);
        return $test1;
    }
}
