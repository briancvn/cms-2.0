import { CommonService } from '../Services/CommonService';
import { NavigationService } from '../Services/NavigationService';
import { BaseComponent } from './BaseComponent';

export abstract class BaseRouterBoot extends BaseComponent {
    constructor(protected commonService: CommonService, protected navigationService: NavigationService) {
        super(commonService);
        this.navigationService.navigate();
    }
}
