import { Component } from '@angular/core';

import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'modal',
    template: `
        <div mat-dialog-title>
            <ng-content select="[modal-header]"></ng-content>
        </div>
        <div class="modal-content">
            <spinner id="modalSpinner">
                <div mat-dialog-content>
                    <ng-content></ng-content>
                </div>
                <div mat-dialog-actions>
                    <ng-content select="[modal-footer]"></ng-content>
                </div>
            </spinner>
        </div>
        `,
    styleUrls: ['../Styles/Components/Modal.scss']
})
export class ModalComponent extends BaseComponent {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}
