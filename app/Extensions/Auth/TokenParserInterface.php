<?php

namespace CMS\Extensions\Auth;

interface TokenParserInterface
{
    public function getToken(Session $session);
    public function getSession($token);
}
