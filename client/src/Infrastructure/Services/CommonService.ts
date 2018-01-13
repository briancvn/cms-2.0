import { Injectable } from '@angular/core';

import { BaseService } from './BaseService';
import { FormCollection } from './FormCollection';
import { LogService } from './LogService';
import { ReferenceDataService } from './ReferenceDataService';
import { ResourceService } from './ResourceService';
import { SnackBarService } from './SnackBarService';
import { TranslateService } from './TranslateService';
import { NavigationService } from './NavigationService';

@Injectable()
export class CommonService extends BaseService {
    constructor(public logService: LogService,
        public snackBarService: SnackBarService,
        public formCollection: FormCollection,
        public translateService: TranslateService,
        public referenceDataService: ReferenceDataService,
        public resourceService: ResourceService,
        public navigationService: NavigationService,
    ) {
        super();
    }
}
