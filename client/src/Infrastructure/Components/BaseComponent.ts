import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { v4 } from 'uuid';

import { EReferenceDataKind } from '../Enums/EReferenceDataKind';
import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { CommonService } from '../Services/CommonService';

declare var settings: ISettings;
declare var userContext: Authenticate;

export abstract class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NgForm) form: NgForm;

    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }

    readonly EReferenceDataKind = EReferenceDataKind;
    readonly id = `${this.constructor.name}-${v4()}`;

    protected isReadOnly: boolean;
    protected isEditable: boolean;

    private subscriptions: Subscription[] = [];

    constructor(protected commonService: CommonService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        if (this.commonService.subscriptions) {
            this.commonService.subscriptions.unsubscribe(this.id);
        } else {
            this.subscriptions.forEach(x => x.unsubscribe());
        }
    }

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        if (this.commonService.subscriptions) {
            this.commonService.subscriptions.subscribe(observable, handler, this.id);
        } else {
            this.subscriptions.push(observable.subscribe((data) => handler(data)));
        }
    }
}
