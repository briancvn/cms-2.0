<?php

namespace CMS\Extensions\Auth;

use CMS\Domains\User;

class Session extends CMS\Common\AbstractClass
{
    protected $User;
    protected $Token;
    protected $StartTime;
    protected $ExpirationTime;

    public function isAuthenticated()
    {
        return !is_null($this->User);
    }

    public function getUser()
    {
        return $this->User;
    }

    public function setUser($user)
    {
        $this->User = $user;
    }

    public function getToken()
    {
        return $this->Token;
    }

    public function setToken($Token)
    {
        $this->Token = $Token;
    }

    public function getExpirationTime()
    {
        return $this->ExpirationTime;
    }

    public function setExpirationTime($time)
    {
        $this->ExpirationTime = $time;
    }

    public function getStartTime()
    {
        return $this->StartTime;
    }

    public function setStartTime($time)
    {
        $this->StartTime = $time;
    }
}
