import { OnDestroy } from '@angular/core';

import { SubscriptionCollection } from '../Services/SubscriptionCollection';

export abstract class BaseRouterBoot implements OnDestroy {
    constructor(private subscriptions: SubscriptionCollection) {}

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.onDestroy();
    }

    protected onDestroy(): void {
        // virtual method
    }
}
