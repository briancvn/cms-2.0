import { Component, NgModule, ViewEncapsulation } from "@angular/core";

import { BaseRouterBoot, SubscriptionCollection, InfrastructureModule } from '../../../../Infrastructure';
import { EModule } from '../../../Enums/EModule';
import { UserRoutingModule } from "./UserRoutingModule";

@Component({
    selector: EModule.User,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class UserBoot extends BaseRouterBoot {
    constructor(subscriptions: SubscriptionCollection) {
        super(subscriptions);
    }
}

@NgModule({
    imports: [
        InfrastructureModule,
        UserRoutingModule
    ],
    providers: [
        SubscriptionCollection
    ],
    declarations: [UserBoot],
    bootstrap: [UserBoot]
})
export default class UserModule {}
