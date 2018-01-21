import { Type } from '@angular/core';

import { FullnamePipe } from './FullnamePipe';
import { RoleIconPipe } from './RoleIconPipe';
import { StringFormatPipe } from './StringFormatPipe';
import { TranslatePipe } from './TranslatePipe';

export const INFRASTRUCTURE_PIPES: Type<any>[] = [
    FullnamePipe,
    RoleIconPipe,
    StringFormatPipe,
    TranslatePipe
];
