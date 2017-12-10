import { DataTypeDecorator, DataType } from './DataType';
import { makePropDecorator } from '../Deprecated/decorators';

export interface ArrayDataTypeDecorator extends DataTypeDecorator {}

export const ArrayDataType: ArrayDataTypeDecorator = makePropDecorator('ArrayDataType', [['type', undefined]]);

export interface ArrayDataType extends DataType {}
