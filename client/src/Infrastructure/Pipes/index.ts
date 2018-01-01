import { Type } from '@angular/core';
import { TranslatePipe } from './TranslatePipe';
import { StringFormatPipe } from './StringFormatPipe';

export const INFRASTRUCTURE_PIPES: Type<any>[] = [
    TranslatePipe,
    StringFormatPipe
];
