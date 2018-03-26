import { Component } from '@angular/core';

import { BaseComponent, CommonService } from '../../Infrastructure';

@Component({
    selector: 'home',
    templateUrl: 'HomeComponent.html'
})
export class HomeComponent extends BaseComponent {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}
