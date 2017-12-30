import { Directive, HostBinding, Injector, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormCollection } from '../Services/FormCollection';

@Directive({
    selector: 'form'
})
export class FormDirective implements OnDestroy {
    @HostBinding('class') class = 'form-horizontal';
    @HostBinding('attr.novalidate') novalidate = '';

    constructor(private form: NgForm, private formCollection: FormCollection, injector: Injector) {
        form.name = (<any>injector).view.context.constructor.name;
        this.formCollection.add(form);
    }

    ngOnDestroy(): void {
        this.formCollection.remove(this.form);
    }
}
