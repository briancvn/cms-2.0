<?php
namespace CMS\Services;

class UserService extends BaseService
{
    public function test()
    {
        return $this->testPrivate();
    }

    private function testPrivate() {
        //return $this->peopleRepository->test();
        return 'TEST UserService';
    }
}