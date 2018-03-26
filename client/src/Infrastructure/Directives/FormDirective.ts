import { Directive, ElementRef, HostBinding, Injector, OnDestroy, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { delay, switchMap, takeUntil } from 'rxjs/operators';
import { v4 } from 'uuid';

import { FormCollection } from '../Collections/FormCollection';
import { CommonConstants } from '../Constants/CommonConstants';
import { Subscribable } from '../Services/Subscribable';

@Directive({ selector: 'form'})
export class FormDirective extends Subscribable implements OnDestroy {
    @HostBinding('class') class = 'form-horizontal';
    @HostBinding('attr.novalidate') novalidate = CommonConstants.Empty;

    constructor(injector: Injector,
        elementRef: ElementRef,
        private form: NgForm,
        @Optional() private formCollection: FormCollection
    ) {
        super();
        form.name = (<any>injector).view.context.constructor.name;
        form[CommonConstants.IdKey] = v4();
        this.formCollection.add(form);
        var submit = fromEvent(elementRef.nativeElement, 'submit');
        this.subscribe(submit.pipe(switchMap(x => of(x).pipe(
            delay(CommonConstants.MEDIUM_TIMEOUT),
            takeUntil(submit)
        ))), this.handleSubmit.bind(this));
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.formCollection.remove(this.form);
    }

    handleSubmit(event: Event): void {
        // TODO[HCN] Not implemented
    }
}
