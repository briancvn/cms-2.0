import { Type } from '@angular/core';

export type SetterFn = (obj: any, value: any) => void;

export type GetterFn = (obj: any) => any;

export type MethodFn = (obj: any, args: any[]) => any;

export function isType(v: any): v is Type<any> {
    return typeof v === 'function';
}
