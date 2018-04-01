<?php
namespace CMS\Contracts;

class UserSearchResultDto extends BaseDto
{
    public $Username;
    public $Email;
    public $Phone;
    public $Pin;
    public $RoleGroups;
}