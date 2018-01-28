import { Component, TemplateRef, ViewChild, Input, ContentChild } from '@angular/core';

import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'field',
    template: `
        <ng-template #template>
            <ng-content></ng-content>
        </ng-template>`
})
export class SearchFieldComponent extends BaseComponent {
    @ViewChild('template') templateRef: TemplateRef<any>;
    @ContentChild('header') headerTemplateRef: TemplateRef<any>;

    @Input() name: string;

    constructor(commonService: CommonService) {
        super(commonService);
    }
}
