// tslint:disable no-any
export abstract class ReflectorReader {
    abstract parameters(typeOrFunc: /*Type*/ any): any[][];
    abstract annotations(typeOrFunc: /*Type*/ any): any[];
    abstract propMetadata(typeOrFunc: /*Type*/ any): {[key: string]: any[]};
    abstract importUri(typeOrFunc: /*Type*/ any): string|null;
    abstract resourceUri(typeOrFunc: /*Type*/ any): string;
    abstract resolveIdentifier(name: string, moduleUrl: string, members: string[], runtime: any): any;
    abstract resolveEnum(identifier: any, name: string): any;
}
