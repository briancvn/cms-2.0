import { Injectable } from '@angular/core';

import { CommonConstants } from '../Constants/CommonConstants';
import { Authenticate } from '../Models/Authenticate';

declare var userContext: Authenticate;

@Injectable()
export class TranslateService {
    get language(): string {
        return userContext && userContext.Profile && userContext.Profile.Language || CommonConstants.DEFAULT_LANGUAGE;
    }

    private currentLanguage = CommonConstants.DEFAULT_LANGUAGE;
}
