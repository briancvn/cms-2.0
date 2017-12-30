import { AfterViewInit, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';

import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { CommonService } from '../Services/CommonService';

declare var settings: ISettings;
declare var userContext: Authenticate;

export abstract class BaseComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @ViewChild(NgForm) form: NgForm;

    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }

    protected isReadOnly: boolean;
    protected isEditable: boolean;
    private subscriptions: Subscription[] = [];

    constructor(protected commonService: CommonService) {}

    ngOnInit(): void {
        this.onInit();
        var initPromise = Promise.all([this.performInitAsync()]);
        if (initPromise) {
            initPromise.then(() => {
                // Not implemented
            }, error => {
                // Not implemented
            });
        }
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges(changes);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.onDestroy();
    }

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        var subscription: Subscription = observable.subscribe(data => handler(data));
        this.subscriptions.push(subscription);
    }

    protected onInit(): void {
        // Virtual method
    }

    protected afterViewInit(): void {
        // Virtual method
    }

    protected onChanges(changes: SimpleChanges): void {
        // Virtual method
    }

    protected onDestroy(): void {
        // Virtual method
    }

    protected performInitAsync(): Promise<any> {
        return Promise.resolve(null);
    }
}
