import * as _ from 'underscore';

export class Utils {
    static getDeepValue(obj: Object, path: string|string[]): any {
        let pathArr = _.isArray(path) ? path : path.split(/\/|\./g);
        let value = obj[pathArr.shift()];
        if (value && pathArr.length > 0) {
            return Utils.getDeepValue(value, pathArr);
        }
        return value;
    }
}
