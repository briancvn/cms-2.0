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
    selector: ModuleConstants.User.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class UserBoot extends BaseRouterBoot {
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
        UserBoot,
        ...COMPONENTS
    ],
    bootstrap: [UserBoot]
})
export class UserModule {}
