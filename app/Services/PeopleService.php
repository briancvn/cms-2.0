<?php
namespace CMS\Services;

use CMS\Repositories\PeopleRepository;
use CMS\Repositories\UserRepository;
use CMS\Extensions\Mapper;
use CMS\Contracts\PeopleDto;

class PeopleService extends BaseService
{
    private $mapper;
    private $peopleRepository;
    private $userRepository;

    public function __construct(Mapper $mapper, PeopleRepository $peopleRepository, UserRepository $userRepository)
    {
        parent::__construct();
        $this->mapper = $mapper;
        $this->peopleRepository = $peopleRepository;
        $this->userRepository = $userRepository;
    }

    public function test()
    {
        return $this->testPrivate();
    }

    private function testPrivate() {
        $test = $this->peopleRepository->findAll();
        return $this->mapper->mapMultiple($test, PeopleDto::class);
    }
}