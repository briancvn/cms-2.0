import { Route } from '@angular/router';

import { EModuleGroup } from '../Enums/EModuleGroup';
import { AuthenticateActivate } from '../Services/AuthenticateActivate';

export class Module {
    get routePath(): string {
        return this.Name;
    }

    constructor(public Path: string,
        public Name: string,
        public Group: EModuleGroup
    ) {}
}
