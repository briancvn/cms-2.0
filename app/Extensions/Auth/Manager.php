<?php

namespace CMS\Extensions\Auth;

use Phalcon\Di;

use CMS\Domains\User;
use CMS\Constants\ErrorCodes;
use CMS\Constants\Services;
use CMS\Extensions\Exception;
use CMS\Extensions\Mvc\Plugin;

class Manager extends Plugin
{
    const LOGIN_DATA_USERNAME = "username";
    const LOGIN_DATA_PASSWORD = "password";

    protected $accountTypes;
    protected $session;
    protected $sessionDuration;

    public function __construct($sessionDuration = 86400)
    {
        $this->sessionDuration = $sessionDuration;
        $this->accountTypes = [];
        $this->session = null;
    }

    public function registerAccountType($name, AccountType $account)
    {
        $this->accountTypes[$name] = $account;
        return $this;
    }

    public function getAccountTypes()
    {
        return $this->accountTypes;
    }


    public function getSessionDuration()
    {
        return $this->sessionDuration;
    }

    public function setSessionDuration($time)
    {
        $this->sessionDuration = $time;
    }


    public function getSession()
    {
        return $this->session;
    }

    public function setSession(Session $session)
    {
        $this->session = $session;
    }

    public function loggedIn()
    {
        return !!$this->session;
    }

    public function loginWithUsernamePassword($accountTypeName, $username, $password)
    {
        return $this->login($accountTypeName, [

            self::LOGIN_DATA_USERNAME => $username,
            self::LOGIN_DATA_PASSWORD => $password
        ]);
    }

    public function login($accountTypeName, array $data)
    {
        if (!$account = $this->getAccountType($accountTypeName)) {
            throw new Exception(ErrorCodes::AUTH_INVALID_ACCOUNT_TYPE);
        }

        $identity = $account->login($data);
        if (!$identity) {
            throw new Exception(ErrorCodes::AUTH_LOGIN_FAILED);
        }

        $startTime = time();
        $session = new Session($accountTypeName, $identity, $startTime, $startTime + $this->sessionDuration);
        $token = $this->tokenParser->getToken($session);
        $session->setToken($token);

        $this->session = $session;

        return $this->session;
    }

    public function getAccountType($name)
    {
        if (array_key_exists($name, $this->accountTypes)) {
            return $this->accountTypes[$name];
        }

        return null;
    }

    public function authenticateToken($token)
    {
        try {
            $session = $this->tokenParser->getSession($token);
        }
        catch (\Exception $e) {
            throw new Exception(ErrorCodes::AUTH_TOKEN_INVALID);
        }

        if (!$session) {
            return false;
        }

        if ($session->getExpirationTime() < time()) {
            throw new Exception(ErrorCodes::AUTH_SESSION_EXPIRED);
        }

        $session->setToken($token);

        // Authenticate identity
        if (!$account = $this->getAccountType($session->getAccountTypeName())) {
            throw new Exception(ErrorCodes::AUTH_SESSION_INVALID);
        }

        if (!$account->authenticate($session->getIdentity())) {
            throw new Exception(ErrorCodes::AUTH_TOKEN_INVALID);
        }

        $this->session = $session;

        return true;
    }

    public function authenticate(User $user = null, string $password)
    {
        $security = Di::getDefault()->get(Services::SECURITY);
        if (!$user || !$security->checkHash($password, $user->Password)) {
            throw new Exception(ErrorCodes::AUTH_LOGIN_FAILED);
        }

        $startTime = time();
        $session = new Session($user->Id, $startTime, $startTime + $this->sessionDuration);
        $token = $this->tokenParser->getToken($session);
        $session->setToken($token);

        $this->session = $session;

        return $this->session;
    }

    public function logout()
    {
        if (!$this->session) {
            return;
        }
        $session = new Session(UsernameAccountType::NAME,
            $this->session->getIdentity(),
            $this->session->getStartTime(),
            time(),
            $this->session->getToken());
        $this->setSession($session);
    }
}
