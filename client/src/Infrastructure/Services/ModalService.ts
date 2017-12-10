import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import * as _ from 'underscore';

@Injectable()
export class ModalService {
    private config: MatDialogConfig = {
        disableClose: true
    };

    constructor(private dialog: MatDialog) {}

    show<T>(component: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T> {
        config = _.extend(this.config, config);
        config.width = `${(<any>component).size}px`;
        return this.dialog.open(component, config);
    }

    alert(title: string, message: string | string[]): void {
        alert(`${title} ${message}`);
    }
}
