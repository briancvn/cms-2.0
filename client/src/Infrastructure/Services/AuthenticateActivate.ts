import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthenticateService } from './AuthenticateService';
import { BaseService } from './BaseService';

@Injectable()
export class AuthenticateActivate extends BaseService implements CanActivate {
    constructor(private authService: AuthenticateService, private router: Router) {
        super();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.authService.isAuthenticated) {
                this.router.navigate(['/']);
        }
        return true;
    }
}
