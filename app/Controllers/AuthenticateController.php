<?php

namespace CMS\Controllers;

use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\AuthenticateDto;
use CMS\Services\UserService;

class AuthenticateController extends ApiController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
    }

    public function IsAuthenticated(): ?AuthenticateDto
    {
        return $this->userService->isAuthenticated();
    }

    /** @Post */
    public function Login(AuthRequestDto $requestDto): AuthenticateDto
    {
        return $this->userService->login($requestDto);
    }

    public function Logout()
    {
        return $this->userService->logout();
    }
}
