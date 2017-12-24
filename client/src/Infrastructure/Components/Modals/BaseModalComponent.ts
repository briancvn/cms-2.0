import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { BaseContentComponent } from '../BaseContentComponent';
import { CommonService } from '../../Services/CommonService';

export abstract class BaseModalComponent<T> extends BaseContentComponent {
    static size: EModalSize | number = EModalSize.MEDIUM;

    constructor(commonService: CommonService, protected dialogRef: MatDialogRef<T>) {
        super(commonService);
    }

    close(): void {
        this.dialogRef.close();
    }

    updateSize(width: number | EModalSize, height?: number | EModalSize): void {
        this.dialogRef.updateSize(width ? `${width}px` : null, height ? `${height}px` : null);
    }
}
