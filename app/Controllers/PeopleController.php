<?php

namespace CMS\Controllers;

/**
 * @RoutePrefix("/people")
 */
class PeopleController extends ApiController
{
    /**
     * @Get("/")
     */
    public function getIndexAction()
    {
        return 'TEST PeopleController 1';
    }

    /**
     * @Get("/test")
     */
    public function testAction()
    {
        return 'TEST PeopleController 2';
    }
}
