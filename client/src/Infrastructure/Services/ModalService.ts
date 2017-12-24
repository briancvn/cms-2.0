import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';

import { BaseMsgDialogComponent } from '../Components/Modals/BaseMsgDialogComponent';
import { ResponseErrorDialogComponent } from '../Components/Modals/ResponseErrorDialogComponent';
import { CommonConstants } from '../Constants/CommonConstants';

const BreakLine = '<br \/>';

@Injectable()
export class ModalService {
    private config: MatDialogConfig = {};

    constructor(private dialog: MatDialog) {}

    showReponseError(message: string, title?: string): void {
        message = message.replace(BreakLine, CommonConstants.Empty)
            .replace(/<br \/>/, CommonConstants.Empty)
            .replace(/(<b>Fatal error<\/b>:)/, '<h2>$1</h2>')
            .replace(/(Stack trace:)/, `${BreakLine}${BreakLine}<h4>$1</h4>`)
            .replace(/(#\d+)/g, `${BreakLine}$1`)
            .replace(/(<br \/>)(#0)/, '$2');

        this.showDialogMessage(ResponseErrorDialogComponent, message, title);
    }

    show<T>(component: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T> {
        config = _.extend(this.config, config);
        config.width = `${(<any>component).size}px`;
        return this.dialog.open(component, config);
    }

    private showDialogMessage<T extends BaseMsgDialogComponent<T>>(
        component: ComponentType<T>,
        message: string,
        title?: string
    ): Observable<boolean> {
        let config = _.clone(this.config);
        config.width = `${(<any>component).size}px`;
        let dialogRef: MatDialogRef<T>;
        dialogRef = this.dialog.open(component, config);
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    }

    alert(title: string, message: string | string[]): void {
        alert(`${title} ${message}`);
    }
}
