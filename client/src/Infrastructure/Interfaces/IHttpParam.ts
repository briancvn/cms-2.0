import { Type } from '@angular/core';

export interface IHttpParam {
    Url: string;
    Body?: any;
    DeserializedType?: Type<any>;
    SpinnerId?: string;
    Authenticate?: boolean;
}
