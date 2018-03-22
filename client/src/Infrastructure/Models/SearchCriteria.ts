import { CommonConstants } from '../Constants/CommonConstants';
import { IFilterDescriptor, ISortDescriptor } from '../Interfaces';

export class SearchCriteria {
    Skip = 0;
    Limit = CommonConstants.PAGE_SIZE;
    Sort: ISortDescriptor = <ISortDescriptor>{};
    Filter: IFilterDescriptor = <IFilterDescriptor>{};
}
