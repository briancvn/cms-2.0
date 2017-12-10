import { Type } from '@angular/core';
// tslint:disable-next-line:no-any
export type SetterFn = (obj: any, value: any) => void;
// tslint:disable-next-line:no-any
export type GetterFn = (obj: any) => any;
// tslint:disable-next-line:no-any
export type MethodFn = (obj: any, args: any[]) => any;

// tslint:disable-next-line:no-any
export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}
