import { NgModule } from '@angular/core';

import { HttpClientService } from '../Services/HttpClientService';
import { NavigationService } from '../Services/NavigationService';
import { SpinnerService } from '../Services/SpinnerService';
import { SubscriptionCollection } from '../Services/SubscriptionCollection';

@NgModule({
    providers: [
        HttpClientService,
        SpinnerService,
        NavigationService,
        SubscriptionCollection
    ]
})
export class CoreModule {}
