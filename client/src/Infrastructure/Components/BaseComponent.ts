import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CommonConstants } from '../Constants/CommonConstants';
import { EReferenceDataKind } from '../Enums/EReferenceDataKind';
import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { CommonService } from '../Services/CommonService';
import { Subscribable } from '../Services/Subscribable';

declare var settings: ISettings;
declare var userContext: Authenticate;

// tslint:disable:no-empty
export abstract class BaseComponent extends Subscribable implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NgForm) form: NgForm;

    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }

    readonly EReferenceDataKind = EReferenceDataKind;
    readonly CommonConstants = CommonConstants;

    protected isReadOnly: boolean;
    protected isEditable: boolean;

    constructor(protected commonService: CommonService) {
        super();
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
