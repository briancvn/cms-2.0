import { Component } from '@angular/core';

import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'module-detail',
    template: `
        <div>
            TEST DETAIL
            <ng-content></ng-content>
        </div>`
})
export class ModuleDetailComponent extends BaseComponent {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}
