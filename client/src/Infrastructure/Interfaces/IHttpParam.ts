import { Type } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface IHttpParam {
    Method?: string;
    Url?: string;
    Body?: any;
    DeserializedType?: Type<any>;
    SpinnerId?: string;
    Authenticate?: boolean;
    IsModalRequest?: boolean;
    Form?: NgForm;
}
