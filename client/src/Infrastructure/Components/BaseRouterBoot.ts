import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

export abstract class BaseRouterBoot extends BaseComponent {
    constructor(commonService: CommonService) {
        super(commonService);
        this.commonService.navigationService.navigate();
    }
}
