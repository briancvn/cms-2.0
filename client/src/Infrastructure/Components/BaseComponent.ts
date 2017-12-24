import { AfterViewInit, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

    constructor(protected commonService: CommonService) {}

    ngOnInit(): void {
        this.onInit();
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges(changes);
    }

    ngOnDestroy(): void {
        if (this.form) {
            this.commonService.formCollection.remove(this.form);
        }
        this.onDestroy();
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
}
