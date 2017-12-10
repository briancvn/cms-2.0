import { Component, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { BaseModalComponent } from './BaseModalComponent';

@Component({
    selector: 'msg-dialog',
    templateUrl: 'BaseMsgDialogComponent.html',
    styleUrls: ['../../Styles/Components/Modals/BaseMsgDialog.scss']
})
export class BaseMsgDialogComponent<T> extends BaseModalComponent<T> {
    static size = EModalSize.SMALL;

    @HostBinding('attr.class') classes = 'msg-dialog';

    message: string;
    title: string;

    constructor(dialogRef: MatDialogRef<T>) {
        super(dialogRef);
    }
}
