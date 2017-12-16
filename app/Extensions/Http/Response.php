<?php

namespace CMS\Extensions\Http;

use CMS\Constants\Services;
use CMS\Contracts\ResponseDto;
use CMS\Contracts\ResponseErrorDto;

class Response extends \Phalcon\Http\Response
{
    public function setErrorContent(\Exception $e, $debugMode = false)
    {
        if (!$debugMode) {
            $content = new  ResponseDto();
            $content->Error = new ResponseErrorDto();
            $content->Error->Error = new ResponseErrorDto($e);
            $content->Error->
            $this->setJsonContent($content);
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
