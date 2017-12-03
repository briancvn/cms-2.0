<?php

namespace CMS\Controllers;

use CMS\Services\PeopleService;

class PeopleController extends ApiController
{
    private $mapper;
    private $peopleService;

    public function __construct(PeopleService $peopleService)
    {
        parent::__construct();
        $this->peopleService = $peopleService;
    }

    public function Index()
    {
        return 'TEST PeopleController 1';
    }

    public function Test(): array
    {
        return $this->peopleService->test();
    }
}
