<?php

namespace CMS\Controllers;

use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\UserDto;
use CMS\Services\UserService;

class AuthenticateController extends ApiController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
    }

    /** @Ignore */
    public function IsAuthenticated()
    {
        return 'TEST';
    }

    /** @Post */
    public function Login(AuthRequestDto $requestDto): UserDto
    {
        return $this->userService->login($requestDto);
    }

    /** @Ignore */
    public function Logout()
    {
        return $this->userService->logout();
    }
}
