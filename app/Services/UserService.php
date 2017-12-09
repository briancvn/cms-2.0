<?php
namespace CMS\Services;

use CMS\Extensions\Auth\Manager as AuthManager;
use CMS\Extensions\Mapper\Manager as Mapper;
use CMS\Repositories\UserRepository;
use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\UserDto;

class UserService extends BaseService
{
    private $mapper;
    private $authManager;
    private $userRepository;

    public function __construct(Mapper $mapper, AuthManager $authManager, UserRepository $userRepository) {
        $this->mapper = $mapper;
        $this->authManager = $authManager;
        $this->userRepository = $userRepository;
    }

    public function login(AuthRequestDto $requestDto): UserDto
    {
        $user = $this->userRepository->findOneBy(['Username' => $requestDto->Username]);
        $session = $this->authManager->authenticate($user, $requestDto->Password);
        return $this->mapper->map($user, UserDto::class);
//        return [
//            'token' => $session->getToken(),
//            'expires' => $session->getExpirationTime(),
//            'user' => $user
//        ];
    }

    public function logout()
    {
        $this->authManager->logout();
    }
}
