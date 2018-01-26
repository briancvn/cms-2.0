import { CommonService } from '../Services/CommonService';
import { BaseContentComponent } from './BaseContentComponent';

export abstract class BaseMaterDetailComponent<T> extends BaseContentComponent {
    dataSource: T[] = [];

    constructor(commonService: CommonService) {
        super(commonService)
    }
}
