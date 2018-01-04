import { Component, NgModule, ViewEncapsulation } from "@angular/core";

import { BaseRouterBoot, SubscriptionCollection, InfrastructureModule } from '../../../../Infrastructure';
import { EModule } from '../../../Enums/EModule';
import { ConfigurationRoutingModule } from "./ConfigurationRoutingModule";

@Component({
    selector: EModule.Configuration,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationBoot extends BaseRouterBoot {
    constructor(subscriptions: SubscriptionCollection) {
        super(subscriptions);
    }
}

@NgModule({
    imports: [
        InfrastructureModule,
        ConfigurationRoutingModule
    ],
    providers: [
        SubscriptionCollection
    ],
    declarations: [ConfigurationBoot],
    bootstrap: [ConfigurationBoot]
})
export default class ConfigurationModule {}
