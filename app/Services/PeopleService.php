<?php
namespace CMS\Services;

use CMS\Repositories\PeopleRepository;
use CMS\Repositories\UserRepository;

class PeopleService extends BaseService
{
    private $peopleRepository;
    private $userRepository;

    public function __construct(PeopleRepository $peopleRepository, UserRepository $userRepository)
    {
        parent::__construct();
        $this->peopleRepository = $peopleRepository;
        $this->userRepository = $userRepository;
    }

    public function test()
    {
        return $this->testPrivate();
    }

    private function testPrivate() {
        return $this->peopleRepository->test().' - '.$this->userRepository->test();
    }
}