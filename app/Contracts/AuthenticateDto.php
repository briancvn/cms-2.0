<?php
namespace CMS\Contracts;

use CMS\Contracts\ProfileDto;

class AuthenticateDto
{
    public $Token;
    public $Expires;
    public $Role;
    public $Profile;

    public function __construct(string $token, $expires, string $role, ProfileDto $profile) {
        $this->Token = $token;
        $this->Expires = $expires;
        $this->Role= $role;
        $this->Profile = $profile;
    }
}