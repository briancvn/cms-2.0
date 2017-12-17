import { Injectable } from '@angular/core';

import { CommonConstants } from '../Constants/CommonConstants';
import { BaseService } from './BaseService';

@Injectable()
export class TranslateService extends BaseService {
    get language(): string {
        return this.userContext && this.userContext.Profile && this.userContext.Profile.Language || CommonConstants.DEFAULT_LANGUAGE;
    }

    private currentLanguage = CommonConstants.DEFAULT_LANGUAGE;
}
