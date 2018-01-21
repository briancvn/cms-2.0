import { Injectable, Optional } from '@angular/core';

import { ModuleInstance } from '../Models/ModuleInstance';
import { BaseService } from './BaseService';
import { FormCollection } from './FormCollection';
import { LogService } from './LogService';
import { ModuleNavigationService } from './ModuleNavigationService';
import { ReferenceDataService } from './ReferenceDataService';
import { ResourceService } from './ResourceService';
import { SnackBarService } from './SnackBarService';
import { SubscriptionCollection } from './SubscriptionCollection';
import { TranslateService } from './TranslateService';

@Injectable()
export class CommonService extends BaseService {
    constructor(@Optional() public moduleInstance: ModuleInstance,
        @Optional() public subscriptions: SubscriptionCollection,
        @Optional() public navigationService: ModuleNavigationService,
        public logService: LogService,
        public snackBarService: SnackBarService,
        public formCollection: FormCollection,
        public translateService: TranslateService,
        public referenceDataService: ReferenceDataService,
        public resourceService: ResourceService
    ) {
        super();
    }
}
