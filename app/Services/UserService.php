<?php
namespace CMS\Services;

use CMS\Extensions\Auth\Session;
use CMS\Repositories\UserRepository;
use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\AuthenticateDto;
use CMS\Contracts\ProfileDto;
use CMS\Contracts\SignUpRequestDto;

class UserService extends BaseService
{
    /** @var UserRepository */
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    protected function IsAuthenticated(): ?AuthenticateDto
    {
        $session = $this->authManager->getSession();
        return $this->responseAuthenticateDto($session);
    }

    protected function signIn(AuthRequestDto $requestDto): ?AuthenticateDto
    {
        $user = $this->userRepository->findOneByAuthRequest($requestDto->Username);
        return $this->responseAuthenticateDto($this->authManager->signIn($user, $requestDto->Password));
    }

    protected function signUp(SignUpRequestDto $requestDto): ?AuthenticateDto
    {
        $user = $this->userRepository->findOneByAuthRequest($requestDto->Username);
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
