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
        $user = new User([
            Username => 'aaa',
            Email => 'aaa',
            Phone => 'aaa',
            Pin => 123,
            Password => 'aaa',
            RoleGroups => [],
            Profile => new Profile([
                Pin => 123,
                FirstName => 'aaa',
                LastName => 'aaa',
                Birthday => new \DateTime(),
                FirstName => 'M',
                LastName => 'vi'
            ])
        ]);

        $this->userRepository->getDocumentManager()->persist($user);
        $this->userRepository->getDocumentManager()->flush();
        $this->user = $user;
    }

    protected function end() {
        $this->userRepository->getDocumentManager()->remove($this->user);
        $this->userRepository->getDocumentManager()->flush();
    }
}