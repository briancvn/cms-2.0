import { Injectable, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class NavigationService {
    constructor(@Optional() private router: Router, private route: ActivatedRoute) {}

    hack(): void {
        this.router['resetUrlToCurrentUrlTree'] = () => {/* HACK: not update value of browser's url when validation is failed */ };
    }

    navigate(url: string[]): void {
        this.router.navigate(url, { skipLocationChange: true });
    }

    navigateByUrl(url: string): Promise<boolean> {
        return this.router.navigateByUrl(url, { skipLocationChange: true });
    }
}
