import { Directive, HostBinding, Injector, OnDestroy, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 } from 'uuid';

import { FormCollection } from '../Collections/FormCollection';
import { CommonConstants } from '../Constants/CommonConstants';

@Directive({ selector: 'form'})
export class FormDirective implements OnDestroy {
    @HostBinding('class') class = 'form-horizontal';
    @HostBinding('attr.novalidate') novalidate = '';

    constructor(injector: Injector, private form: NgForm, @Optional() private formCollection: FormCollection) {
        form.name = (<any>injector).view.context.constructor.name;
        form[CommonConstants.IdKey] = v4();
        this.formCollection.add(form);
    }

    ngOnDestroy(): void {
        this.formCollection.remove(this.form);
    }
}
