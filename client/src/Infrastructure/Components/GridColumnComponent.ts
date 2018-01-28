import { Component, TemplateRef, ViewChild, Input, ContentChild } from '@angular/core';

import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'column',
    template: `
        <ng-template #template>
            <ng-content></ng-content>
        </ng-template>`
})
export class GridColumnComponent extends BaseComponent {
    @ViewChild('template') templateRef: TemplateRef<any>;
    @ContentChild('header') headerTemplateRef: TemplateRef<any>;

    @Input() field: string;

    constructor(commonService: CommonService) {
        super(commonService);
    }
}
