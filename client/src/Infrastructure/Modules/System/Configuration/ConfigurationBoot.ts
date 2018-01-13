import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { ROUTES } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { NavigationService } from '../../../Services/NavigationService';
import { SubscriptionCollection } from '../../../Services/SubscriptionCollection';
import { COMPONENTS } from './Components';
import { ROUTER_PROVIDERS } from './ConfigurationRoutes';

@Component({
    selector: ModuleConstants.Configuration,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationBoot extends BaseRouterBoot {
    constructor(navigationService: NavigationService, subscriptions: SubscriptionCollection) {
        super(navigationService, subscriptions);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        
    ],
    providers: [
        SubscriptionCollection,
        { provide: ROUTES, useValue: ROUTER_PROVIDERS }
    ],
    declarations: [
        ConfigurationBoot,
        ...COMPONENTS
    ],
    bootstrap: [ConfigurationBoot]
})
export default class ConfigurationModule {}
