import { Injectable, Type } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';

import { Response } from '../Models';
import { ReflectionService } from '../Services/ReflectionService';
import { ArrayDataType, DataType } from '../Decorators';

@Injectable()
export class JsonDeserializer {
    constructor(private reflectionService: ReflectionService) {}

    public deserialize(responseObj: Response, deserializedType: Type<any>): Response {
        if (!deserializedType || !responseObj || !responseObj.Result) {
            return responseObj;
        }
        var typedResult = new deserializedType();
        _.extend(typedResult, responseObj.Result);
        this.deserializeWithType(typedResult, deserializedType);
        responseObj.Result = typedResult;
        return responseObj;
    }

    private deserializeWithType(sourceObject: any, targetType: Type<any>): void {
        if (!sourceObject) {
            return;
        }
        var propertiesToDeserialize = this.reflectionService.getDataMemberProperties(targetType);
        var propKeys = Object.keys(propertiesToDeserialize);
        if (propKeys.length > 0) {
            propKeys.forEach(propKey => {
                var propValue = sourceObject[propKey];
                if (propValue && _.isObject(propValue)) {
                    var dataMember = propertiesToDeserialize[propKey];
                    if (dataMember instanceof ArrayDataType) {
                        if (!_.isArray(propValue)) {
                            throw new Error(`The value ${propValue} is declared as Array but actually it's not an Array`);
                        }
                        var arrayPropValue = new Array();
                        sourceObject[propKey] = arrayPropValue;
                        (<Array<any>>propValue).forEach(arrayItemValue => {
                            if (_.isObject(arrayItemValue)) {
                                arrayPropValue.push(this.deserializeMember(arrayItemValue, dataMember));
                            } else {
                                arrayPropValue.push(arrayPropValue);
                            }
                        });
                    } else {
                        sourceObject[propKey] = this.deserializeMember(propValue, dataMember);
                    }
                }
            });
        }
    }

    private deserializeMember(propValue: any, dataType: DataType): any {
        var typedPropValue = new dataType.type();
        _.extend(typedPropValue, propValue);
        this.deserializeWithType(typedPropValue, dataType.type);
        return typedPropValue;
    }

    private deserializeToJsonObject(key: string, value: any) : any {
        if (typeof value !== 'string') {
            return value;
        }
        if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/)) {
            // parse input value as UTC date then convert to local date
            return moment.utc(value).toDate();
        }
        return value;
    }
}
