export class StringUtils {
    static formatString(source: string, ...args: any[]): string {
        return source
            ? source.replace(/{(\d+)}/g, (match, number) => (typeof args[number] !== 'undefined' && args[number] !== null) ? args[number] : match)
            : null;
    }
}
