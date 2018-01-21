import { ModuleCommonService } from '../Services/ModuleCommonService';
import { BaseComponent } from './BaseComponent';

export abstract class BaseRouterBoot extends BaseComponent {
    constructor(protected moduleCommonService: ModuleCommonService) {
        super(moduleCommonService.commonService, moduleCommonService.subscriptions);
        this.moduleCommonService.navigationService.navigate();
    }
}
