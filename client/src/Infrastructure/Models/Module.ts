import { Type } from '@angular/core';
import { EModuleGroup } from '../Enums/EModuleGroup';

export class Module {
    constructor(public ModuleType: Type<any>,
        public Name: string,
        public Group: EModuleGroup
    ) {}
}
