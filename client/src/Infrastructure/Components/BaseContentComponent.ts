import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

export class BaseContentComponent extends BaseComponent {
    constructor(commonService: CommonService) {
        super(commonService);
    }

    protected performInitAsync(): Promise<any> {
        return Promise.all([this.loadReferenceData()]);
    }

    protected loadReferenceData(): Promise<any> {
        if (this.commonService.referenceDataService) {
            return Promise.all([this.commonService.referenceDataService.internalLoad()])
                .then(r => this.commonService.referenceDataService.notifyLoaded());
        }
        return Promise.resolve();
    }
}
