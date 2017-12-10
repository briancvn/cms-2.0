<?php

namespace CMS\Extensions\Mvc;

/**
 * CMS\Extensions\Mvc\Plugin
 * This class allows to access services in the services container by just only accessing a public property
 * with the same name of a registered service
 *
 * @property \CMS\Extensions\Api $application
 * @property \CMS\Extensions\Http\Request $request
 * @property \CMS\Extensions\Http\Response $response
 * @property \CMS\Extensions\Auth\Manager $authManager
 * @property \CMS\Services\UserService $userService
 * @property \CMS\Extensions\Auth\TokenParserInterface $tokenParser
 */
class Plugin extends \Phalcon\Mvc\User\Plugin {}