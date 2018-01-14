
import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { IModuleParameter } from '../Interfaces/IModuleParameter';

@Injectable()
export class ModuleParameter {
    private moduleParameter: IModuleParameter;

    setParameter(moduleParameter: IModuleParameter): void {
        this.moduleParameter = moduleParameter;
    }

    get<T>(key: string): T {
        let result = null;
        var params = this.moduleParameter;
        if (params) {
            result = params[key] as T || null;
        }
        if (result !== null) {
            return _.clone(result);
        }
        return result;
    }

    clear(): void {
        this.moduleParameter = null;
    }

    static create(key: string, value: any): IModuleParameter {
        let parameter = {};
        parameter[key] = value;
        return parameter;
    }
}
