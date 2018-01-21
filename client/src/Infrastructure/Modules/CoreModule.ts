import { NgModule } from '@angular/core';

import { ModuleInstance } from '../Services/ModuleInstance';
import { ModuleCommonService } from '../Services/ModuleCommonService';
import { NavigationService } from '../Services/NavigationService';
import { SubscriptionCollection } from '../Services/SubscriptionCollection';

@NgModule({
    providers: [
        ModuleCommonService,
        NavigationService,
        SubscriptionCollection
    ]
})
export class CoreModule {}
