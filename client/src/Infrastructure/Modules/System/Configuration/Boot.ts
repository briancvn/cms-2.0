import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { CommonService } from '../../../Services/CommonService';
import { NavigationService } from '../../../Services/NavigationService';
import { SubscriptionCollection } from '../../../Services/SubscriptionCollection';
import { CoreModule } from '../../CoreModule';
import { COMPONENTS } from './Components';
import { ROUTES } from './Routes';

@Component({
    selector: ModuleConstants.Configuration.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationBoot extends BaseRouterBoot {
    constructor(subscriptions: SubscriptionCollection, commonService: CommonService, navigationService: NavigationService) {
        super(subscriptions, commonService, navigationService);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        CoreModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        ConfigurationBoot,
        ...COMPONENTS
    ],
    bootstrap: [ConfigurationBoot]
})
export class ConfigurationModule {}
