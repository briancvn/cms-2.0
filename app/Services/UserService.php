<?php
namespace CMS\Services;

use CMS\Extensions\Auth\Session;
use CMS\Repositories\UserRepository;
use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\AuthenticateDto;
use CMS\Contracts\ProfileDto;
use CMS\Contracts\UserSearchResultDto;
use CMS\Contracts\UserDto;
use CMS\Contracts\SignUpRequestDto;
use CMS\Domains\User;

class UserService extends GenericService
{
    public function __construct(UserRepository $userRepository) {
        parent::__construct($userRepository, UserSearchResultDto::class, UserDto::class);
    }

    protected function IsAuthenticated(): ?AuthenticateDto
    {
        $session = $this->authManager->getSession();
        return $this->responseAuthenticateDto($session);
    }

    protected function signIn(AuthRequestDto $requestDto): ?AuthenticateDto
    {
        $user = $this->repository->findOneByAuthRequest($requestDto->Username);
        return $this->responseAuthenticateDto($this->authManager->signIn($this->mapper->map($user, User::class), $requestDto->Password));
    }

    protected function signUp(SignUpRequestDto $requestDto): ?AuthenticateDto
    {
        $user = $this->repository->findOneByAuthRequest($requestDto->Username);
        return $this->responseAuthenticateDto($this->authManager->signIn($user, $requestDto->Password));
    }

    protected function signOut()
    {
        $this->authManager->signOut();
    }

    private function responseAuthenticateDto(Session $session) : ?AuthenticateDto
    {
        if ($session && $session->isAuthenticated()) {
            return new AuthenticateDto([
                Token => $session->getToken(),
                Expires => $session->getExpirationTime(),
                RoleGroups => $session->getUser()->RoleGroups,
                Profile => $this->mapper->map($session->getUser()->Profile, ProfileDto::class)
            ]);
        }
        return null;
    }
}
