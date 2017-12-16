<?php

namespace CMS\Extensions\Http;

use CMS\Contracts\ResponseDto;
use CMS\Contracts\ResponseErrorDto;
use CMS\Contracts\ResponseWarningDto;
use CMS\Extensions\WarningException;

class Response extends \Phalcon\Http\Response
{
    public function setErrorContent(\Exception $e, $debugMode = false)
    {
        if (!$debugMode) {
            $content = new  ResponseDto();
            $content->Error = new ResponseErrorDto($e);
            $this->setJsonContent($content);
            return;
        }

        if ($e instanceof WarningException) {
            $this->setStatusCode($e->getCode());
            $this->setContent($e->getMessage());
            return;
        }

        $this->setContent(join('', [
            '<h2>500 Internal Server Error</h2>',
            $e->getMessage(),
            'Stack trace:',
            $e->getTraceAsString()
        ]));
    }

    public function setJsonContent($content, $jsonOptions = 0, $depth = 512)
    {
        parent::setJsonContent($content, $jsonOptions, $depth);

        $this->setContentType('application/json', 'UTF-8');
        $this->setHeader('E-Tag', md5($this->getContent()));
    }
}
