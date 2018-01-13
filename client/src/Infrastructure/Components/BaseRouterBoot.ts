import { OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { SubscriptionCollection } from '../Services/SubscriptionCollection';
import { NavigationService } from '../Services/NavigationService';

export abstract class BaseRouterBoot implements OnDestroy {
    constructor(private navigationService: NavigationService, private subscriptions: SubscriptionCollection) {
        //this.navigationService.navigateByUrl('/module-container');
        this.navigationService.hack();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.onDestroy();
    }

    protected onDestroy(): void {
        // virtual method
    }
}
