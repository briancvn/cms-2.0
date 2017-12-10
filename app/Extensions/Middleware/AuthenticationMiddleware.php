<?php

namespace CMS\Extensions\Middleware;

use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\MiddlewareInterface;

use CMS\Constants\Services;
use CMS\Extensions\Mvc\Plugin;
use CMS\Extensions\Auth\Manager as AuthManager;

class AuthenticationMiddleware extends Plugin implements MiddlewareInterface
{
    private $authManager;

    public function beforeExecuteRoute()
    {
        $this->authManager = $this->getDi()->get(AuthManager::class);
        $token = $this->request->getToken();

        if ($token) {
            $this->authManager->authenticateToken($token);
        }
    }

    public function afterExecuteRoute()
    {
        $sessionAdapter = $this->getDi()->get(Services::SESSION);
        $sessionAdapter->set(Services::AUTH_MANAGER, serialize($this->authManager->getSession()));
    }

    public function call(Micro $api)
    {
        return true;
    }
}