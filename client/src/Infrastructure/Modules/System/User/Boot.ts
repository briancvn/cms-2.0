import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseRouterBoot } from '../../../Components/BaseRouterBoot';
import { ModuleConstants } from '../../../Constants/ModuleConstants';
import { InfrastructureCoreModule } from '../../../InfrastructureCoreModule';
import { BaseSearchService } from '../../../Services/BaseSearchService';
import { CommonService } from '../../../Services/CommonService';
import { NavigationService } from '../../../Services/NavigationService';
import { CoreModule } from '../../CoreModule';
import { COMPONENTS } from './Components';
import { UserCriteria } from './Models/UserCriteria';
import { ROUTES } from './Routes';
import { UserService } from './Services/UserService';

@Component({
    selector: ModuleConstants.User.Name,
    template: `<module-router-outlet></module-router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class UserBoot extends BaseRouterBoot {
    constructor(commonService: CommonService, navigationService: NavigationService) {
        super(commonService, navigationService);
    }
}

@NgModule({
    imports: [
        InfrastructureCoreModule,
        CoreModule,
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        UserCriteria,
        UserService
    ],
    declarations: [
        UserBoot,
        ...COMPONENTS
    ],
    bootstrap: [UserBoot]
})
export class UserModule {}
