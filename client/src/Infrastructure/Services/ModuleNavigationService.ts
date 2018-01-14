import { CommonConstants } from '../Constants/CommonConstants';
import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteProvider } from '../RouteProvider';
import { ModuleService } from './ModuleService';
import { ModuleInstance } from '../Models/ModuleInstance';

@Injectable()
export class ModuleNavigationService {
    moduleInstance: ModuleInstance;

    constructor(@Optional() private router: Router, private route: ActivatedRoute) {}

    navigate(url = CommonConstants.Empty): void {
        this.router.navigate([`/${RouteProvider.MODULE_ROUTE}/${this.moduleInstance.Module.routePath}/${url}`], {
            skipLocationChange: true
        });
    }
}
