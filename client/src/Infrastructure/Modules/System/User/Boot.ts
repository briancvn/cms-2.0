import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { ModuleCommonService } from '../../../Services/ModuleCommonService';
import { CoreModule } from '../../CoreModule';
import { COMPONENTS } from './Components';
import { ROUTES } from './Routes';

@Component({
    selector: ModuleConstants.User.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class UserBoot extends BaseRouterBoot {
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
    providers: [],
    declarations: [
        UserBoot,
        ...COMPONENTS
    ],
    bootstrap: [UserBoot]
})
export class UserModule {}
