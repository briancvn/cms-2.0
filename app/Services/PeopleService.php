<?php
namespace CMS\Services;

use CMS\Repositories\PeopleRepository;

class PeopleService
{
    private $peopleRepository;

    public function __construct(PeopleRepository $peopleRepository)
    {
        $this->peopleRepository = $peopleRepository;
    }

    public function test()
    {
        return $this->peopleRepository->test();
    }
}