import { Injectable } from '@angular/core';

import { ISettings } from '../Interfaces/ISettings';
import { AuthRequest } from '../Models/AuthRequest';
import { BaseBackendService } from './BaseBackendService';
import { HttpClientService } from './HttpClientService';

declare var settings: ISettings;

@Injectable()
export class SystemService extends BaseBackendService {
    constructor(http: HttpClientService) {
        super(http, 'System', false);
    }

    getSettings(): Promise<void> {
        return this.get<ISettings>({ Method: 'GetSettings' })
          .then(response => {
                settings = response;
          });
    }
}
