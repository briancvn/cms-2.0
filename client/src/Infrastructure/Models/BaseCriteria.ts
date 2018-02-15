import { CommonConstants } from '../Constants/CommonConstants';
import { IFilterDescriptor, ISortDescriptor } from '../Interfaces';

export class BaseCriteria {
    PageIndex = 0;
    Skip = 0;
    Take = CommonConstants.PAGE_SIZE;
    Sort: ISortDescriptor = <ISortDescriptor>{};
    Filter: IFilterDescriptor = <IFilterDescriptor>{};
}
