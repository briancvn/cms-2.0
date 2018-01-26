<?php
namespace CMS\Contracts;

class UserDto extends BaseDto
{
    public $Username;
    public $Email;
    public $Phone;
    public $Pin;
    public $RoleGroups;
    public $Profile;
}