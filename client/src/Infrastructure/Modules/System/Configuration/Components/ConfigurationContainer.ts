import { Component } from '@angular/core';

import { BaseComponent } from '../../../../Components/BaseComponent';
import { ModuleCommonService } from '../../../../Services/ModuleCommonService';

@Component({
    selector: 'configuration-container',
    templateUrl: 'ConfigurationContainer.html'
})
export class ConfigurationContainer extends BaseComponent {
    constructor(moduleCommonService: ModuleCommonService) {
        super(moduleCommonService.commonService, moduleCommonService.subscriptions);
    }
}
