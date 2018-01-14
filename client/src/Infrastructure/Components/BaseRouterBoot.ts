import { OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { SubscriptionCollection } from '../Services/SubscriptionCollection';
import { ModuleNavigationService } from '../Services/ModuleNavigationService';

export abstract class BaseRouterBoot implements OnDestroy {
    constructor(private navigationService: ModuleNavigationService, private subscriptions: SubscriptionCollection) {
        this.navigationService.navigate();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.onDestroy();
    }

    protected onDestroy(): void {
        // virtual method
    }
}
