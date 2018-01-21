import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonService } from '../../Services/CommonService';
import { ModuleInstance } from '../../Services/ModuleInstance';
import { ModuleService } from '../../Services/ModuleService';
import { BaseComponent } from '../BaseComponent';

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
