import { Component, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { CommonService } from '../../Services/CommonService';
import { BaseComponent } from '../BaseComponent';

@Component({
    selector: 'msg-dialog',
    templateUrl: 'BaseMsgDialogComponent.html',
    styleUrls: ['../../Styles/Components/Modals/BaseMsgDialog.scss']
})
export class BaseMsgDialogComponent<T> extends BaseComponent {
    static size = EModalSize.SMALL;

    @HostBinding('attr.class') classes = 'msg-dialog';

    message: string;
    title: string;

    constructor(commonService: CommonService, protected dialogRef: MatDialogRef<T>) {
        super(commonService);
    }

    close(): void {
        this.dialogRef.close();
    }
}
