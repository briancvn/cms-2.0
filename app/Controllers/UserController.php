<?php

namespace CMS\Controllers;

use CMS\Contracts\SearchCriteriaDto;
use CMS\Contracts\SearchResultDto;
use CMS\Contracts\UserDto;
use CMS\Services\UserService;

class UserController extends ApiController
{
    /** @var UserService */
    private $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
    }

    /** @Post */
    public function Search(SearchCriteriaDto $criteria): SearchResultDto
    {
        return $this->userService->Search($criteria);
    }

    /** @Get */
    public function FindById(string $id): UserDto
    {
        return $this->userService->FindById($id);
    }
}
