<?php
namespace CMS\Contracts;

use CMS\Contracts\ProfileDto;

class AuthenticateDto
{
    public $Token;
    public $Expires;
    public $RoleGroups;
    public $Profile;

    public function __construct(string $token = null, $expires = null, array $roleGroups = null, ProfileDto $profile = null) {
        $this->Token = $token;
        $this->Expires = $expires;
        $this->RoleGroups= $roleGroups;
        $this->Profile = $profile;
    }
}