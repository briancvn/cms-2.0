import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CommonConstants } from '../Constants/CommonConstants';
import { ModuleInstance } from './ModuleInstance';
import { RouteProvider } from '../RouteProvider';

@Injectable()
export class NavigationService {
    constructor(private moduleInstance: ModuleInstance, private router: Router) {}

    navigate(url = CommonConstants.Empty): void {
        this.router.navigate([`/${RouteProvider.MODULE_ROUTE}/${this.moduleInstance.Module.routePath}/${url}`], {
            skipLocationChange: true
        });
    }
}
