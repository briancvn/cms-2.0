import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BaseComponent } from '../BaseComponent';
import { CommonService } from '../../Services/CommonService';
import { ModuleService } from '../../Services/ModuleService';
import { ModuleInstance } from '../../Models/ModuleInstance';

@Component({
    selector: 'module-header',
    templateUrl: 'ModuleHeaderComponent.html',
    styleUrls: ['../../Styles/Components/Layouts/ModuleHeader.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleHeaderComponent extends BaseComponent {
    @Input() instance: ModuleInstance;

    constructor(commonService: CommonService, private moduleService: ModuleService) {
        super(commonService);
    }

    cancel(): void {
        this.moduleService.removeInstance(this.instance);
    }
}
