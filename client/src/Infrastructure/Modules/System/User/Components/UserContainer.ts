import { Component } from '@angular/core';

import { BaseMaterDetailComponent } from '../../../../Components/BaseMaterDetailComponent';
import { CommonService } from '../../../../Services/CommonService';
import { User } from '../Models/User';

@Component({
    selector: 'user-container',
    templateUrl: 'UserContainer.html'
})
export class UserContainer extends BaseMaterDetailComponent<User> {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}
