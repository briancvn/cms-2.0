import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { CommonService } from '../../../Services/CommonService';
import { COMPONENTS } from './Components';
import { ROUTES } from './Routes';

@Component({
    selector: ModuleConstants.Configuration.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationBoot extends BaseRouterBoot {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        RouterModule.forChild(ROUTES)
    ],
    providers: [],
    declarations: [
        ConfigurationBoot,
        ...COMPONENTS
    ],
    bootstrap: [ConfigurationBoot]
})
export class ConfigurationModule {}
