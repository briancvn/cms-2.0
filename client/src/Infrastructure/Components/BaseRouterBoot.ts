import { CommonService } from '../Services/CommonService';
import { NavigationService } from '../Services/NavigationService';
import { SubscriptionCollection } from '../Services/SubscriptionCollection';
import { BaseComponent } from './BaseComponent';

export abstract class BaseRouterBoot extends BaseComponent {
    constructor(subscriptions: SubscriptionCollection,
        protected commonService: CommonService,
        protected navigationService: NavigationService
    ) {
        super(commonService, subscriptions);
        this.navigationService.navigate();
    }
}
