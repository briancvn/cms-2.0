import { Type } from '@angular/core';
import { makePropDecorator } from '../Deprecated/decorators';

export interface DataTypeDecorator {
    (type: Type<any>): any;
    new (type: Type<any>): any;
}

export interface DataType {
    type: Type<any>;
}

export const DataType: DataTypeDecorator = makePropDecorator('DataType', [['type', undefined]]);
