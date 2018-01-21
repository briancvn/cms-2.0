import { Injectable } from '@angular/core';

import { CommonService } from './CommonService';
import { ModuleInstance } from './ModuleInstance';
import { NavigationService } from './NavigationService';
import { SubscriptionCollection } from './SubscriptionCollection';

@Injectable()
export class ModuleCommonService {
    constructor(public commonService: CommonService,
        public moduleInstance: ModuleInstance,
        public subscriptions: SubscriptionCollection,
        public navigationService: NavigationService
    ) {}
}
