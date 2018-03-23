import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SubscriptionCollection } from '../Collections/SubscriptionCollection';

export class Subscribable implements OnDestroy {
    private subscriptions = new SubscriptionCollection();

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        this.subscriptions.subscribe(observable, handler);
    }
}
