import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import * as _ from 'underscore';

import { ESnackBarType } from '../Enums/ESnackBarType';

@Injectable()
export class SnackBarService {
    private defaultOptions: MatSnackBarConfig = {
        duration: 3000
    };

    constructor(private snackBar: MatSnackBar) {}

    warning(message: string): void {
        this.show(ESnackBarType.Warning, message, {
            // Override not implemented
        });
    }

    show(type: ESnackBarType, message: string, overrideOptions: MatSnackBarConfig): void {
        this.snackBar.open(message, null, _.extend({
            extraClasses: [ESnackBarType[type].toLowerCase()]
        }, this.defaultOptions, overrideOptions));
    }
}
