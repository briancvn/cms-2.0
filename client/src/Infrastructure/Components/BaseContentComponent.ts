import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

export class BaseContentComponent extends BaseComponent {
    constructor(commonService: CommonService) {
        super(commonService);
    }

    protected performInitAsync(): Promise<any> {
        return Promise.all([this.loadReferenceData()]);
    }

    protected performAfterViewInitAsync(): Promise<any> {
        return Promise.all([this.loadResource()]);
    }

    private loadReferenceData(): Promise<any> {
        if (this.commonService.referenceDataService) {
            return Promise.all([this.commonService.referenceDataService.internalLoad()])
                .then(r => this.commonService.referenceDataService.notifyLoaded());
        }
        return Promise.resolve();
    }

    private loadResource(): Promise<any> {
        if (this.commonService.resourceService) {
            return Promise.all([this.commonService.resourceService.internalLoad()])
                .then(r => this.commonService.resourceService.notifyLoaded());
        }
        return Promise.resolve();
    }
}
