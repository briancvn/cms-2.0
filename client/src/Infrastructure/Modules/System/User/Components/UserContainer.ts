import { Component } from '@angular/core';

import { BaseComponent } from '../../../../Components/BaseComponent';
import { CommonService } from '../../../../Services/CommonService';
import { SubscriptionCollection } from '../../../../Services/SubscriptionCollection';

@Component({
    selector: 'user-container',
    templateUrl: 'UserContainer.html'
})
export class UserContainer extends BaseComponent {
    constructor(commonService: CommonService, subscriptions: SubscriptionCollection) {
        super(commonService, subscriptions);
    }
}
