<?php

namespace CMS\Controllers;

class SystemController extends ApiController
{
    public function GetSettings()
    {
        return $this->config->get('externals')->client;
    }
}
