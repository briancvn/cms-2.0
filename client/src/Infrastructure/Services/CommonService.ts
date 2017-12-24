import { Injectable } from '@angular/core';

import { BaseService } from './BaseService';
import { FormCollection } from './FormCollection';
import { LogService } from './LogService';
import { SnackBarService } from './SnackBarService';
import { TranslateService } from './TranslateService';

@Injectable()
export class CommonService extends BaseService {
    constructor(public logService: LogService,
        public snackBarService: SnackBarService,
        public formCollection: FormCollection,
        public translateService: TranslateService
    ) {
        super();
    }
}
