import { AfterViewInit, ElementRef, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EModalSize } from '../../Enums/EModalSize';
import { CommonService } from '../../Services/CommonService';
import { BaseContentComponent } from '../BaseContentComponent';

export abstract class BaseModalComponent<T> extends BaseContentComponent implements AfterViewInit {
    static size: EModalSize | number = EModalSize.MEDIUM;

    @HostBinding('class.draggable') draggable = true;

    constructor(commonService: CommonService, protected dialogRef: MatDialogRef<T>) {
        super(commonService);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public updateSize(width: number | EModalSize, height?: number | EModalSize): void {
        this.dialogRef.updateSize(width ? `${width}px` : null, height ? `${height}px` : null);
    }

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (this.draggable) {
            let containerRef = <ElementRef>(<any>this.dialogRef)._containerInstance._elementRef;
            jQuery(containerRef.nativeElement).draggable({ handle: '[mat-dialog-title]' });
        }
    }
}
