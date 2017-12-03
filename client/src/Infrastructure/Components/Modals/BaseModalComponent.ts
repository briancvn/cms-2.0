import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { BaseComponent } from '../BaseComponent';

export abstract class BaseModalComponent<T> extends BaseComponent {
    static size: EModalSize | number = EModalSize.MEDIUM;

    constructor(protected dialogRef: MatDialogRef<T>) {
        super();
    }

    close(): void {
        this.dialogRef.close();
    }

    updateSize(width: number | EModalSize, height?: number | EModalSize): void {
        this.dialogRef.updateSize(width ? `${width}px` : null, height ? `${height}px` : null);
    }
}
