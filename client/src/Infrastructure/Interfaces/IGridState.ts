import { IFilterDescriptor } from './IFilterDescriptor';
import { ISortDescriptor } from './ISortDescriptor';

export interface IGridState {
    PageIndex?: number;
    Skip?: number;
    Limit?: number;
    Sort?: ISortDescriptor;
    Filter?: IFilterDescriptor;
}
