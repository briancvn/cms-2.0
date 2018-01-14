import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { ModuleNavigationService } from '../../../Services/ModuleNavigationService';
import { SubscriptionCollection } from '../../../Services/SubscriptionCollection';
import { COMPONENTS } from './Components';
import { ROUTES } from './Routes';

@Component({
    selector: ModuleConstants.Configuration.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationBoot extends BaseRouterBoot {
    constructor(navigationService: ModuleNavigationService, subscriptions: SubscriptionCollection) {
        super(navigationService, subscriptions);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        SubscriptionCollection
    ],
    declarations: [
        ConfigurationBoot,
        ...COMPONENTS
    ],
    bootstrap: [ConfigurationBoot]
})
export class ConfigurationModule {}
