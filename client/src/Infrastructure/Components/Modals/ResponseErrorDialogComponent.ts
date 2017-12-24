import { Component, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { CommonService } from '../../Services/CommonService';
import { BaseMsgDialogComponent } from './BaseMsgDialogComponent';

@Component({
    selector: 'response-error-dialog',
    templateUrl: 'ResponseErrorDialogComponent.html',
    styleUrls: ['../../Styles/Components/Modals/ResponseErrorDialog.scss']
})
export class ResponseErrorDialogComponent extends BaseMsgDialogComponent<ResponseErrorDialogComponent> {
    static size = EModalSize.MEDIUM;

    @HostBinding('attr.class') classes = 'response-error-dialog';

    constructor(commonService: CommonService, dialogRef: MatDialogRef<ResponseErrorDialogComponent>) {
        super(commonService, dialogRef);
    }
}
