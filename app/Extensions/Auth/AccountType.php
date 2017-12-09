<?php

namespace CMS\Extensions\Auth;

interface AccountType
{
    public function login($data);
    public function authenticate($identity);
}
