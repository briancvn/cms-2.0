import { NgModule } from '@angular/core';

import { NavigationService } from '../Services/NavigationService';
import { SubscriptionCollection } from '../Services/SubscriptionCollection';

@NgModule({
    providers: [
        NavigationService,
        SubscriptionCollection
    ]
})
export class CoreModule {}
