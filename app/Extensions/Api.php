<?php

namespace CMS\Extensions;

use Phalcon\Mvc\Micro;
use CMS\Constants\Services;

class Api extends Micro
{
    public function attach($middleware)
    {
        if (!$this->getEventsManager()) {
            $this->setEventsManager($this->getDI()->get(Services::EVENTS_MANAGER));
        }

        $this->getEventsManager()->attach('micro', $middleware);

        return $this;
    }
}
