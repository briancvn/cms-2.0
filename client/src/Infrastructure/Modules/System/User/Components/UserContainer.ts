import { Component } from '@angular/core';

import { BaseComponent } from '../../../../Components/BaseComponent';
import { ModuleCommonService } from '../../../../Services/ModuleCommonService';

@Component({
    selector: 'user-container',
    templateUrl: 'UserContainer.html'
})
export class UserContainer extends BaseComponent {
    constructor(moduleCommonService: ModuleCommonService) {
        super(moduleCommonService.commonService, moduleCommonService.subscriptions);
    }
}
