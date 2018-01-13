import { Component, NgModule, ViewEncapsulation } from '@angular/core';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { NavigationService } from '../../../Services/NavigationService';
import { SubscriptionCollection } from '../../../Services/SubscriptionCollection';
import { COMPONENTS } from './Components';
import { ROUTER_PROVIDERS } from './UserRoutes';

@Component({
    selector: ModuleConstants.User,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class UserBoot extends BaseRouterBoot {
    constructor(navigationService: NavigationService, subscriptions: SubscriptionCollection) {
        super(navigationService, subscriptions);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        ROUTER_PROVIDERS
    ],
    providers: [
        SubscriptionCollection
    ],
    declarations: [
        UserBoot,
        ...COMPONENTS
    ],
    bootstrap: [UserBoot]
})
export default class UserModule {}
