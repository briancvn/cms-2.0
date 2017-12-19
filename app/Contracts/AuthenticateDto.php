<?php
namespace CMS\Contracts;

use CMS\Contracts\ProfileDto;

class AuthenticateDto extends BaseDto
{
    public $Token;
    public $Expires;
    public $RoleGroups;
    public $Profile;
}