import { Component } from '@angular/core';

import { ModuleService, BaseComponent, CommonService } from '../../Infrastructure';

@Component({
    selector: 'module-container',
    templateUrl: 'ModuleContainer.html',
    styleUrls: ['../../Styles/ModuleContainer.scss']
})
export class ModuleContainer extends BaseComponent {
    constructor(commonService: CommonService, public moduleService: ModuleService) {
        super(commonService);
    }
}
