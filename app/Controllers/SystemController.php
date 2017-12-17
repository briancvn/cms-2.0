<?php

namespace CMS\Controllers;

use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\AuthenticateDto;
use CMS\Services\UserService;

class SystemController extends ApiController
{
    public function GetSettings()
    {
        return $this->config->get('externals')->client;
    }
}
