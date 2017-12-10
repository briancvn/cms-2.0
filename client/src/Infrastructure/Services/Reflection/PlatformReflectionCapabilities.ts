import { Type } from '@angular/core';
import { GetterFn, MethodFn, SetterFn } from './types';

export interface PlatformReflectionCapabilities {
  isReflectionEnabled(): boolean;
  // tslint:disable-next-line:no-any
  factory(type: Type<any>): Function;
  // tslint:disable-next-line:no-any
  hasLifecycleHook(type: any, lcProperty: string): boolean;
  // tslint:disable-next-line:no-any
  parameters(type: Type<any>): any[][];
  // tslint:disable-next-line:no-any
  annotations(type: Type<any>): any[];
  // tslint:disable-next-line:no-any
  propMetadata(typeOrFunc: Type<any>): { [key: string]: any[] };
  getter(name: string): GetterFn;
  setter(name: string): SetterFn;
  method(name: string): MethodFn;
  // tslint:disable-next-line:no-any
  importUri(type: Type<any>): string;
  // tslint:disable-next-line:no-any
  resourceUri(type: Type<any>): string;
  // tslint:disable-next-line:no-any
  resolveIdentifier(name: string, moduleUrl: string, members: string[] | null, runtime: any): any;
  // tslint:disable-next-line:no-any
  resolveEnum(enumIdentifier: any, name: string): any;
}
