import { Component } from '@angular/core';

import { BaseComponent } from '../../../../Components/BaseComponent';
import { CommonService } from '../../../../Services/CommonService';
import { SubscriptionCollection } from '../../../../Services/SubscriptionCollection';

@Component({
    selector: 'configuration-container',
    templateUrl: 'ConfigurationContainer.html'
})
export class ConfigurationContainer extends BaseComponent {
    constructor(commonService: CommonService, subscriptions: SubscriptionCollection) {
        super(commonService, subscriptions);
    }
}
