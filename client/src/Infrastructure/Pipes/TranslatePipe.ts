import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform, WrappedValue } from '@angular/core';

import { EResource } from '../Enums/EResource';
import { ResourceService } from '../Services/ResourceService';
import { Subscribable } from '../Services/Subscribable';
import { Utils } from '../Utils/Utils';

@Pipe({ name: 'translate' })
export class TranslatePipe extends Subscribable implements OnDestroy, PipeTransform {
    private currentValue : string = null;
    private latestValue: any = null;
    private latestReturnedValue: any = null;

    constructor(private ref: ChangeDetectorRef, private resourceService: ResourceService) {
        super();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.dispose();
    }

    transform(value: string, resource: EResource = EResource.Common): any {
        if (value !== this.currentValue) {
            this.dispose();
            this.currentValue = value;
            this.latestValue = value;
            var observable = this.resourceService.observe(resource)
                .map((translate: Iterable<object>) => Utils.getDeepValue(translate, value));
            this.subscribe(observable, (translate: string) => this.updateLatestValue(observable, translate));
        }

        if (this.latestValue === this.latestReturnedValue) {
            return this.latestReturnedValue;
        }

        this.latestReturnedValue = this.latestValue;
        return WrappedValue.wrap(this.latestValue);
    }

    private dispose(): void {
        this.latestValue = null;
        this.latestReturnedValue = null;
        this.currentValue = null;
    }

    private updateLatestValue(async: any, translate: string): void {
        this.latestValue = translate || this.currentValue;
        this.ref.markForCheck();
    }
}
