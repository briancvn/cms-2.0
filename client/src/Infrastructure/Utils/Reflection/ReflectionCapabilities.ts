import { Type } from '@angular/core';
import { isType, GetterFn, SetterFn, MethodFn } from './Types';
import { IPlatformReflectionCapabilities } from './IPlatformReflectionCapabilities';

declare var global;

export function stringify(token: any): string {
    if (typeof token === 'string') {
        return token;
    }

    if (token === null) {
        return '' + token;
    }

    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }

    if (token.name) {
        return `${token.name}`;
    }

    const res = token.toString();

    if (res === null) {
        return '' + res;
    }

    const newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

/**
 * Attention: This regex has to hold even if the code is minified!
 */
export const DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/;

export class ReflectionCapabilities implements IPlatformReflectionCapabilities {
    // tslint:disable-next-line:no-any
    private _reflect: any;

    // tslint:disable-next-line:no-any
    constructor(reflect?: any) { this._reflect = reflect || global['Reflect']; }

    isReflectionEnabled(): boolean { return true; }

    // tslint:disable-next-line:no-any
    factory<T>(t: Type<T>): (args: any[]) => T { return (...args: any[]) => new t(...args); }

    /** @internal */
    // tslint:disable-next-line:no-any
    _zipTypesAndAnnotations(paramTypes: any[], paramAnnotations: any[]): any[][] {
        // tslint:disable-next-line:no-any
        let result: any[][];

        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        } else {
            result = new Array(paramTypes.length);
        }

        for (let i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            } else if (paramTypes[i] !== Object) {
                result[i] = [paramTypes[i]];
            } else {
                result[i] = [];
            }
            if (paramAnnotations && paramAnnotations[i] !== null) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    }

    // tslint:disable-next-line:no-any
    private _ownParameters(type: Type<any>, parentCtor: any): any[][] | null {
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.
        if (DELEGATE_CTOR.exec(type.toString())) {
            return null;
        }

        // Prefer the direct API.
        // tslint:disable-next-line:no-any
        if ((<any>type).parameters && (<any>type).parameters !== parentCtor.parameters) {
            // tslint:disable-next-line:no-any
            return (<any>type).parameters;
        }

        // API of tsickle for lowering decorators to properties on the class.
        // tslint:disable-next-line:no-any
        const tsickleCtorParams = (<any>type).ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            const ctorParameters =
                typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            // tslint:disable-next-line:no-any
            const paramTypes = ctorParameters.map((ctorParam: any) => ctorParam && ctorParam.type);
            const paramAnnotations = ctorParameters.map(
                // tslint:disable-next-line:no-any
                (ctorParam: any) =>
                    ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }

        // API for metadata created by invoking the decorators.
        if (this._reflect !== null && this._reflect.getOwnMetadata !== null) {
            const paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
            const paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
            if (paramTypes || paramAnnotations) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }

        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        // tslint:disable-next-line:no-any
        return new Array((<any>type.length)).fill(undefined);
    }

    // tslint:disable-next-line:no-any
    parameters(type: Type<any>): any[][] {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!isType(type)) {
            return [];
        }
        const parentCtor = getParentCtor(type);
        let parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    }

    // tslint:disable-next-line:no-any
    private _ownAnnotations(typeOrFunc: Type<any>, parentCtor: any): any[] | null {
        // Prefer the direct API.
        // tslint:disable-next-line:no-any
        if ((<any>typeOrFunc).annotations && (<any>typeOrFunc).annotations !== parentCtor.annotations) {
            // tslint:disable-next-line:no-any
            let annotations = (<any>typeOrFunc).annotations;
            if (typeof annotations === 'function' && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }

        // API of tsickle for lowering decorators to properties on the class.
        // tslint:disable-next-line:no-any
        if ((<any>typeOrFunc).decorators && (<any>typeOrFunc).decorators !== parentCtor.decorators) {
            // tslint:disable-next-line:no-any
            return convertTsickleDecoratorIntoMetadata((<any>typeOrFunc).decorators);
        }

        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('annotations', typeOrFunc);
        }
        return null;
    }

    // tslint:disable-next-line:no-any
    annotations(typeOrFunc: Type<any>): any[] {
        if (!isType(typeOrFunc)) {
            return [];
        }
        const parentCtor = getParentCtor(typeOrFunc);
        const ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        const parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    }

    // tslint:disable-next-line:no-any
    private _ownPropMetadata(typeOrFunc: any, parentCtor: any): { [key: string]: any[] } | null {
        // Prefer the direct API.
        // tslint:disable-next-line:no-any
        if ((<any>typeOrFunc).propMetadata &&
            // tslint:disable-next-line:no-any
            (<any>typeOrFunc).propMetadata !== parentCtor.propMetadata) {
            // tslint:disable-next-line:no-any
            let propMetadata = (<any>typeOrFunc).propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }

        // API of tsickle for lowering decorators to properties on the class.
        // tslint:disable-next-line:no-any
        if ((<any>typeOrFunc).propDecorators &&
            // tslint:disable-next-line:no-any
            (<any>typeOrFunc).propDecorators !== parentCtor.propDecorators) {
            // tslint:disable-next-line:no-any
            const propDecorators = (<any>typeOrFunc).propDecorators;
            // tslint:disable-next-line:no-any
            const propMetadata = <{ [key: string]: any[] }>{};
            Object.keys(propDecorators).forEach(prop => {
                propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
            });
            return propMetadata;
        }

        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('propMetadata', typeOrFunc);
        }
        return null;
    }

    // tslint:disable-next-line:no-any
    propMetadata(typeOrFunc: any): { [key: string]: any[] } {
        if (!isType(typeOrFunc)) {
            return {};
        }
        const parentCtor = getParentCtor(typeOrFunc);
        // tslint:disable-next-line:no-any
        const propMetadata: { [key: string]: any[] } = {};
        if (parentCtor !== Object) {
            const parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach((propName) => {
                propMetadata[propName] = parentPropMetadata[propName];
            });
        }
        const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach((propName) => {
                // tslint:disable-next-line:no-any
                const decorators: any[] = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }
                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    }

    // tslint:disable-next-line:no-any
    hasLifecycleHook(type: any, lcProperty: string): boolean {
        return type instanceof Type && lcProperty in type.prototype;
    }

    getter(name: string): GetterFn { return <GetterFn>new Function('o', 'return o.' + name + ';'); }

    setter(name: string): SetterFn {
        return <SetterFn>new Function('o', 'v', 'return o.' + name + ' = v;');
    }

    method(name: string): MethodFn {
        const functionBody = `if (!o.${name}) throw new Error('"${name}" is undefined');
        return o.${name}.apply(o, args);`;
        return <MethodFn>new Function('o', 'args', functionBody);
    }

    // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
    // tslint:disable-next-line:no-any
    importUri(type: any): string {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return `./${stringify(type)}`;
    }

    // tslint:disable-next-line:no-any
    resourceUri(type: any): string { return `./${stringify(type)}`; }

    // tslint:disable-next-line:no-any
    resolveIdentifier(name: string, moduleUrl: string, members: string[], runtime: any): any {
        return runtime;
    }
    // tslint:disable-next-line:no-any
    resolveEnum(enumIdentifier: any, name: string): any { return enumIdentifier[name]; }
}

// tslint:disable-next-line:no-any
function convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
        const decoratorType = decoratorInvocation.type;
        const annotationCls = decoratorType.annotationCls;
        const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new annotationCls(...annotationArgs);
    });
}

// tslint:disable-next-line:no-any
function getParentCtor(ctor: Function): Type<any> {
    const parentProto = Object.getPrototypeOf(ctor.prototype);
    const parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}
