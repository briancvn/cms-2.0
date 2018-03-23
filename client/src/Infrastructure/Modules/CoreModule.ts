import { NgModule } from '@angular/core';

import { HttpClientService } from '../Services/HttpClientService';
import { NavigationService } from '../Services/NavigationService';
import { SpinnerService } from '../Services/SpinnerService';

@NgModule({
    providers: [
        HttpClientService,
        SpinnerService,
        NavigationService
    ]
})
export class CoreModule {}
