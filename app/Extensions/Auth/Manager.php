<?php

namespace CMS\Extensions\Auth;

use Phalcon\Di;

use CMS\Domains\User;
use CMS\Constants\ErrorCodes;
use CMS\Constants\Services;
use CMS\Constants\RoleGroupConstants;
use CMS\Constants\ValidationMessageConstants;
use CMS\Extensions\Exception\Exception;
use CMS\Extensions\Exception\ValidationException;
use CMS\Extensions\Mvc\Plugin;
use CMS\Extensions\Auth\Session;
use CMS\Extensions\Cache\Manager as CacheManager;

class Manager extends Plugin
{
    /** @var MapperManager */
    protected $cache;

    /** @var Session */
    protected $session;

    protected $sessionDuration;

    public function __construct(CacheManager $cache, $sessionDuration = 86400, Session $session = null)
    {
        $this->cache = $cache;
        $this->sessionDuration = $sessionDuration;
        if ($session && $session->getExpirationTime() > time()) {
            $this->session = new Session([
                User => $session->getUser(),
                StartTime => $session->getStartTime(),
                ExpirationTime => $session->getExpirationTime(),
                Token => $session->getToken()
            ]);
        }
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
        $this->session = $session;

        return true;
    }

    public function signIn(User $user = null, string $password)
    {
        $security = Di::getDefault()->get(Services::SECURITY);
        if (!$user || !$security->checkHash($password, $user->Password)) {
            throw new ValidationException(ValidationMessageConstants::AUTH_LOGIN_FAILED);
        }

        $startTime = time();
        $session = new Session([
            User => $user,
            StartTime => $startTime,
            ExpirationTime => $startTime + $this->sessionDuration
        ]);
        $token = $this->tokenParser->getToken($session);
        $session->setToken($token);

        $this->session = $session;

        return $this->session;
    }

    public function signOut()
    {
        $this->session = null;
    }

    public function isValidBusinessItems(array $businessItems): bool
    {
        if ($this->loggedIn()) {
            $businessRoleGroups = $this->session->getUser()->RoleGroups;
            array_push($businessRoleGroups, RoleGroupConstants::AUTHORIZED);
            return $this->cache->isBusinessRoleGroupsValid($businessRoleGroups, $businessItems);
        }

        return empty($businessItems);
    }
}
