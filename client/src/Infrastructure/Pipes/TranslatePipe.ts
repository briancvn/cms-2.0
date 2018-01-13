import { ChangeDetectorRef, OnDestroy, PipeTransform, WrappedValue, Pipe } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { ResourceService } from '../Services/ResourceService';
import { EResource } from '../Enums/EResource';
import { Utils } from '../Utils/Utils';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements OnDestroy, PipeTransform {
    private currentValue : string = null;
    private latestValue: any = null;
    private latestReturnedValue: any = null;
    private subscription: ISubscription = null;

    constructor(private ref: ChangeDetectorRef, private resourceService: ResourceService) {}

    public ngOnDestroy(): void {
        this.dispose();
    }

    public transform(value: string, resource: EResource = EResource.Common): any {
        if (value !== this.currentValue) {
            this.dispose();
            this.currentValue = value;
            this.latestValue = value;
            var observable = this.resourceService.observe(resource)
                .map((translate: Iterable<object>) => Utils.getDeepValue(translate, value));
            this.subscribe(observable);
        }

        if (this.latestValue === this.latestReturnedValue) {
            return this.latestReturnedValue;
        }

        this.latestReturnedValue = this.latestValue;
        return WrappedValue.wrap(this.latestValue);
    }

    private subscribe(obj: Observable<string>): void {
        this.subscription = obj.subscribe((translate: string) => this.updateLatestValue(obj, translate));
    }

    private dispose(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.latestValue = null;
        this.latestReturnedValue = null;
        this.subscription = null;
        this.currentValue = null;
    }

    private updateLatestValue(async: any, translate: string): void {
        this.latestValue = translate || this.currentValue;
        this.ref.markForCheck();
    }
}
