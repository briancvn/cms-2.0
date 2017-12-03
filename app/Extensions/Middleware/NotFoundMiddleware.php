<?php

namespace CMS\Extensions\Middleware;

use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\MiddlewareInterface;

use CMS\Extensions\Mvc\Plugin;
use CMS\Extensions\Exception;
use CMS\Constants\ErrorCodes;

class NotFoundMiddleware extends Plugin implements MiddlewareInterface
{
    public function beforeNotFound()
    {
        throw new Exception(ErrorCodes::GENERAL_NOT_FOUND);
    }

    public function call(Micro $api) {

        return true;
    }
}
