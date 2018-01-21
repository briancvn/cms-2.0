import * as _ from 'underscore';

export class StringUtils {
    static format(source: string, ...args: any[]): string {
        return source
            ? source.replace(/{(\d+)}/g, (match, number) => (typeof args[number] !== 'undefined' && args[number] !== null) ? args[number] : match)
            : null;
    }

    static join(separator: string, ...params: any[]): string {
        return _.compact(params).join(separator);
    }
}
