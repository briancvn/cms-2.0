import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { CommonService } from '../../../Services/CommonService';
import { ModuleCommonService } from '../../../Services/ModuleCommonService';
import { COMPONENTS } from './Components';
import { ROUTES } from './Routes';
import { CoreModule } from '../../CoreModule';

@Component({
    selector: ModuleConstants.Configuration.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationBoot extends BaseRouterBoot {
    constructor(commonService: ModuleCommonService) {
        super(commonService);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        CoreModule,
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        ModuleCommonService
    ],
    declarations: [
        ConfigurationBoot,
        ...COMPONENTS
    ],
    bootstrap: [ConfigurationBoot]
})
export class ConfigurationModule {}
