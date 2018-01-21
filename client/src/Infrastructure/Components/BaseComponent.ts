import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 } from 'uuid';
import { Observable, Subscription } from 'rxjs/Rx';

import { EReferenceDataKind } from '../Enums/EReferenceDataKind';
import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { CommonService } from '../Services/CommonService';
import { SubscriptionCollection } from '../Services/SubscriptionCollection';

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

    private subscriptions = new SubscriptionCollection();

    constructor(protected commonService: CommonService, subscriptions?: SubscriptionCollection) {
        this.subscriptions = subscriptions || this.subscriptions;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        this.subscriptions.subscribe(observable, handler, this.id);
    }
}
