import { Directive, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormCollection } from '../Services/FormCollection';

@Directive({
    selector: 'form'
})
export class FormDirective {
    constructor(private form: NgForm, private formCollection: FormCollection, private injector: Injector) {
        form.name = (<any>injector).view.context.constructor.name;
        this.formCollection.add(form);
    }
}
