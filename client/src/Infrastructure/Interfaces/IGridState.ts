import { IFilterDescriptor } from './IFilterDescriptor';
import { ISortDescriptor } from './ISortDescriptor';

export interface IGridState {
    PageIndex?: number;
    Skip?: number;
    Take?: number;
    Sort?: ISortDescriptor;
    Filter?: IFilterDescriptor;
}
