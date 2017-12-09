<?php
namespace CMS\Contracts;

use CMS\Contracts\UserDto;

class AuthenticateDto
{
    public $Token;
    public $Expires;
    public $User;

    public function __construct(string $token, $expires, UserDto $user) {
        $this->Token = $token;
        $this->Expires = $expires;
        $this->User = $user;
    }
}