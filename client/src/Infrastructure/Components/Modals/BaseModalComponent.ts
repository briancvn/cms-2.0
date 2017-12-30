import { ElementRef, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { BaseContentComponent } from '../BaseContentComponent';
import { CommonService } from '../../Services/CommonService';

export abstract class BaseModalComponent<T> extends BaseContentComponent {
    static size: EModalSize | number = EModalSize.MEDIUM;

    @HostBinding('class.draggable') draggable = true;

    constructor(commonService: CommonService, protected dialogRef: MatDialogRef<T>) {
        super(commonService);
    }

    close(): void {
        this.dialogRef.close();
    }

    updateSize(width: number | EModalSize, height?: number | EModalSize): void {
        this.dialogRef.updateSize(width ? `${width}px` : null, height ? `${height}px` : null);
    }

    protected afterViewInit(): void {
        super.afterViewInit();
        if (this.draggable) {
            let containerRef = <ElementRef>(<any>this.dialogRef)._containerInstance._elementRef;
            jQuery(containerRef.nativeElement).draggable({ handle: '[mat-dialog-title]' });
        }
    }
}
