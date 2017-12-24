<?php
namespace CMS\Contracts;

use CMS\Common\AbstractClass;

class SignUpRequestDto extends AbstractClass
{
    public $Username;
    public $Email;
    public $Phone;
    public $Password;

    /** @var Profileto */
    public $Profile;
}