import { Injectable } from '@angular/core';

import { LogService } from './LogService';
import { ReferenceDataService } from './ReferenceDataService';
import { ResourceService } from './ResourceService';
import { SnackBarService } from './SnackBarService';
import { TranslateService } from './TranslateService';

@Injectable()
export class CommonService {
    constructor(public logService: LogService,
        public snackBarService: SnackBarService,
        public translateService: TranslateService,
        public referenceDataService: ReferenceDataService,
        public resourceService: ResourceService
    ) {}
}
