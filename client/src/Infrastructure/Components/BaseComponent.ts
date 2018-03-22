import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { CommonConstants } from '../Constants/CommonConstants';
import { EReferenceDataKind } from '../Enums/EReferenceDataKind';
import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { CommonService } from '../Services/CommonService';
import { SubscriptionCollection } from '../Collections/SubscriptionCollection';

declare var settings: ISettings;
declare var userContext: Authenticate;

// tslint:disable:no-empty
export abstract class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NgForm) form: NgForm;

    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }

    readonly EReferenceDataKind = EReferenceDataKind;
    readonly CommonConstants = CommonConstants;

    protected isReadOnly: boolean;
    protected isEditable: boolean;

    private subscriptions = new SubscriptionCollection();

    constructor(protected commonService: CommonService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        this.subscriptions.subscribe(observable, handler);
    }
}
