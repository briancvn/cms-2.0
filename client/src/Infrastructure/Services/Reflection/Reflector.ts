import { Type } from '@angular/core';
import { PlatformReflectionCapabilities } from './PlatformReflectionCapabilities';

/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
import { ReflectorReader } from './ReflectionReader';
import { GetterFn, SetterFn, MethodFn } from './Types';

export class Reflector extends ReflectorReader {
  constructor(public reflectionCapabilities: PlatformReflectionCapabilities) { super(); }

  updateCapabilities(caps: PlatformReflectionCapabilities): void { this.reflectionCapabilities = caps; }

  // tslint:disable-next-line:no-any
  factory(type: Type<any>): Function { return this.reflectionCapabilities.factory(type); }

  // tslint:disable-next-line:no-any
  parameters(typeOrFunc: Type<any>): any[][] {
    return this.reflectionCapabilities.parameters(typeOrFunc);
  }

  // tslint:disable-next-line:no-any
  annotations(typeOrFunc: Type<any>): any[] {
    return this.reflectionCapabilities.annotations(typeOrFunc);
  }

  // tslint:disable-next-line:no-any
  propMetadata(typeOrFunc: Type<any>): { [key: string]: any[] } {
    return this.reflectionCapabilities.propMetadata(typeOrFunc);
  }

  // tslint:disable-next-line:no-any
  hasLifecycleHook(type: any, lcProperty: string): boolean {
    return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
  }

  getter(name: string): GetterFn { return this.reflectionCapabilities.getter(name); }

  setter(name: string): SetterFn { return this.reflectionCapabilities.setter(name); }

  method(name: string): MethodFn { return this.reflectionCapabilities.method(name); }

  // tslint:disable-next-line:no-any
  importUri(type: any): string { return this.reflectionCapabilities.importUri(type); }

  // tslint:disable-next-line:no-any
  resourceUri(type: any): string { return this.reflectionCapabilities.resourceUri(type); }

  // tslint:disable-next-line:no-any
  resolveIdentifier(name: string, moduleUrl: string, members: string[] | null, runtime: any): any {
    return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
  }

  // tslint:disable-next-line:no-any
  resolveEnum(identifier: any, name: string): any {
    return this.reflectionCapabilities.resolveEnum(identifier, name);
  }
}
