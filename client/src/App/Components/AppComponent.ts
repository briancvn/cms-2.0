import { Component } from '@angular/core';

import { BaseContentComponent, CommonService } from '../../Infrastructure';

@Component({
    selector: 'app',
    templateUrl: './AppComponent.html'
})
export class AppComponent extends BaseContentComponent {
    constructor(commonService: CommonService) {
        super(commonService);
    }
}
