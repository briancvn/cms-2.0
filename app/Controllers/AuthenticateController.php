<?php

namespace CMS\Controllers;

use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\AuthenticateDto;
use CMS\Contracts\SignUpRequestDto;
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
    public function SignIn(AuthRequestDto $requestDto): AuthenticateDto
    {
        return $this->userService->signIn($requestDto);
    }

    /** @Post */
    public function SignUp(SignUpRequestDto $requestDto): AuthenticateDto
    {
        return $this->userService->signUp($requestDto);
    }

    public function SignOut()
    {
        return $this->userService->signOut();
    }
}
