import { Injectable, Type } from '@angular/core';

import { DataType, ArrayDataType } from '../Decorators';
import { ReflectorReader } from '../Utils/Reflection/ReflectionReader';

@Injectable()
export class ReflectionService {
    private dataMemberProperties: { classType: Type<any>, properties: Array<any> } = <any>{};

    constructor(private reflector: ReflectorReader) {}

    public getDataMemberProperties(classType: any): { [prop: string]: DataType } {
        var propMapping = this.dataMemberProperties[classType];
        if (!propMapping) {
            propMapping = this.dataMemberProperties[classType] = {};
            var metadata = this.reflector.propMetadata(classType);
            Object.keys(metadata).forEach((propName: string) => {
                metadata[propName].forEach(a => {
                    if ((a instanceof DataType) || (<any>a instanceof ArrayDataType)) {
                        var dataMember = <DataType>a;
                        propMapping[propName] = dataMember;
                    }
                });
            });
        }
        return propMapping || {};
    }
}
