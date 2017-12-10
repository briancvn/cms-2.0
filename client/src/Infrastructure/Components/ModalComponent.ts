import { Component, ContentChild, TemplateRef } from '@angular/core';

import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'modal',
    template: `
        <div mat-dialog-title>
            <ng-content select="modal-header"></ng-content>
        </div>
        <div mat-dialog-content>
            <ng-content></ng-content>
        </div>
        <div mat-dialog-actions>
            <ng-content select="modal-footer"></ng-content>
        </div>`,
    styleUrls: ['../Styles/Components/Modal.scss']
})
export class ModalComponent extends BaseComponent {}
