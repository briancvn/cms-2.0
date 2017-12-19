<?php
namespace CMS\Contracts;

use CMS\Contracts\ProfileDto;

class AuthenticateDto extends CMS\Common\AbstractClass
{
    public $Token;
    public $Expires;
    public $RoleGroups;

    /** @var ProfileDto */
    public $Profile;
}