import { Component } from '@angular/core';

import { BaseDetailComponent } from '../../../../Components/BaseDetailComponent';
import { CommonService } from '../../../../Services/CommonService';
import { User } from '../Models/User';

@Component({
    selector: 'user-detail',
    templateUrl: 'UserDetailComponent.html'
})
export class UserDetailComponent extends BaseDetailComponent<User> {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}
