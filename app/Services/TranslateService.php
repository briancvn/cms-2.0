<?php
namespace CMS\Services;

use CMS\Services\ResourceService;
use CMS\Constants\CommonConstants;
use CMS\Contracts\ResourceRequestDto;
use CMS\Extensions\Utils;

class TranslateService extends BaseService
{
    /** @var ResourceService */
    private $resourceService;

    public function __construct(ResourceService $resourceService) {
        $this->resourceService = $resourceService;
    }

    protected function translate(string $key, $resource = CommonConstants::DEFAULT_RESOURCE): string
    {
        $session = $this->authManager->getSession();
        $language = $session ? $session->getUser()->Profile->Language : CommonConstants::DEFAULT_LANGUAGE;
        $resourceResult = $this->resourceService->getResources(new ResourceRequestDto([
            Language => $language,
            Resources => [$resource]
        ]));
        return Utils::getDeepValue($resourceResult->Resources[$resource], $key);
    }
}
