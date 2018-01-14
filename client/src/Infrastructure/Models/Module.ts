import { Route } from '@angular/router';

import { EModuleGroup } from '../Enums/EModuleGroup';
import { AuthenticateActivate } from '../Services/AuthenticateActivate';

export class Module {
    get route(): Route {
        return { path: this.routePath, loadChildren: this.Path, canActivate:[AuthenticateActivate] };
    }

    get routePath(): string {
        return this.Name;
    }

    constructor(public Path: string,
        public Name: string,
        public Group: EModuleGroup
    ) {}
}
