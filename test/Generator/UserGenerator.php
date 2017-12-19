<?php

namespace Test\Generator;

use CMS\Repositories\UserRepository;
use CMS\Domains\User;
use CMS\Domains\Profile;

class UserGenerator extends BaseGenerator
{
    /** @var UserRepository */
    private $userRepository;

    /** @var User */
    private $user;

    public function __construct(UserRepository $userRepository) {
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

    protected function start() {
        $user = new User();
        $user->Username = 'aaa';
        $user->Email = 'aaa';
        $user->Phone = 'aaa';
        $user->Pin = 123;
        $user->Password = 'aaa';
        $user->RoleGroups = [];

        $profile = new Profile();
        $profile->Pin = 123;
        $profile->FirstName = 'aaa';
        $profile->LastName = 'aaa';
        $profile->Birthday = new \DateTime();
        $profile->FirstName = 'M';
        $profile->LastName = 'vi';

        $user->Profile = $profile;

        $this->userRepository->getDocumentManager()->persist($user);
        $this->userRepository->getDocumentManager()->flush();
        $this->user = $user;
    }

    protected function end() {
        $this->userRepository->getDocumentManager()->remove($this->user);
        $this->userRepository->getDocumentManager()->flush();
    }
}