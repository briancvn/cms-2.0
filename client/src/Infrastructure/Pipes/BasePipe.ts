import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SubscriptionCollection } from '../Collections/SubscriptionCollection';

export abstract class BasePipe implements OnDestroy {
    private subscriptions = new SubscriptionCollection();

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        this.subscriptions.subscribe(observable, handler);
    }
}
