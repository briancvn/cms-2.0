<?php

namespace CMS\Extensions\Middleware;

use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\MiddlewareInterface;

use CMS\Extensions\Mvc\Plugin;

class OptionsResponseMiddleware extends Plugin implements MiddlewareInterface
{
    public function beforeHandleRoute()
    {
        // OPTIONS request, just send the headers and respond OK
        if ($this->request->isOptions()) {

            $this->response->setJsonContent([
                'result' => 'OK',
            ]);

            return false;
        }
    }

    public function call(Micro $api)
    {
        return true;
    }
}