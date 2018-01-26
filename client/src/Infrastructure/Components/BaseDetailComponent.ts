import { CommonService } from '../Services/CommonService';
import { BaseContentComponent } from './BaseContentComponent';

export abstract class BaseDetailComponent<T> extends BaseContentComponent {
    model: T;

    constructor(commonService: CommonService) {
        super(commonService);
    }
}
