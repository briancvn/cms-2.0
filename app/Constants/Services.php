<?php

namespace CMS\Constants;

class Services
{
    const CONFIG = 'config';
    const DB = 'MongoDB';
    const DOCUMENT_MANAGER = 'dm';
    const CACHE_MANAGER = 'cacheManager';
    const AUTH_MANAGER = "authManager";
    const AUTH_USER = "authUser";

    // Phalcon
    const APPLICATION = "application";
    const DISPATCHER = "dispatcher";
    const ROUTER = "router";
    const URL = "url";
    const REQUEST = "request";
    const RESPONSE = "response";
    const COOKIES = "cookies";
    const FILTER = "filter";
    const FLASH = "flash";
    const FLASH_SESSION = "flashSession";
    const SESSION = "session";
    const EVENTS_MANAGER = "eventsManager";
    const SECURITY = "security";
    const CRYPT = "crypt";
    const TAG = "tag";
    const ESCAPER = "escaper";
    const ANNOTATIONS = "annotations";
    const MODELS_MANAGER = "modelsManager";
    const MODELS_METADATA = "modelsMetadata";
    const TRANSACTION_MANAGER = "transactionManager";
    const MODELS_CACHE = "modelsCache";
    const VIEWS_CACHE = "viewsCache";
    const ASSETS = "assets";

    // PhalconApi
    const ACL = "acl";
    const TOKEN_PARSER = "tokenParser";
    const QUERY = "query";
    const USER_SERVICE = "userService";
    const URL_QUERY_PARSER = "urlQueryParser";
    const ERROR_HELPER = "errorHelper";
    const FORMAT_HELPER = "formatHelper";
}
