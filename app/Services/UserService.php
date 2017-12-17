<?php
namespace CMS\Services;

use CMS\Extensions\Auth\Session;
use CMS\Repositories\UserRepository;
use CMS\Contracts\AuthRequestDto;
use CMS\Contracts\AuthenticateDto;
use CMS\Contracts\ProfileDto;

class UserService extends BaseService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function IsAuthenticated(): ?AuthenticateDto
    {
        $session = $this->authManager->getSession();
        return $this->responseAuthenticateDto($session);
    }

    public function signIn(AuthRequestDto $requestDto): ?AuthenticateDto
    {
        $user = $this->userRepository->findOneBy(['Username' => $requestDto->Username]);
        return $this->responseAuthenticateDto($this->authManager->signIn($user, $requestDto->Password));
    }

    protected function signOut()
    {
        $this->authManager->signOut();
    }

    public function responseAuthenticateDto(Session $session) : ?AuthenticateDto
    {
        if ($session && $session->isAuthenticated()) {
            return new AuthenticateDto(
                $session->getToken(),
                $session->getExpirationTime(),
                $session->getUser()->RoleGroups,
                $this->mapper->map($session->getUser()->Profile, ProfileDto::class)
            );
        }
        return null;
    }
}
