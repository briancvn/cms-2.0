<?php
namespace CMS\Contracts;

use CMS\Contracts\ProfileDto;
use CMS\Common\AbstractClass;

class AuthenticateDto extends AbstractClass
{
    public $Token;
    public $Expires;
    public $RoleGroups;

    /** @var ProfileDto */
    public $Profile;
}