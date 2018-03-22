import { Optional } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { SubscriptionCollection } from '../Collections/SubscriptionCollection';

declare var settings: ISettings;
declare var userContext: Authenticate;

export abstract class BaseService {
    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }
    set userContext(value: Authenticate) { userContext = value; }

    constructor(@Optional() private subscriptions?: SubscriptionCollection) {}

    protected subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        if (this.subscriptions) {
            this.subscriptions.subscribe(observable, handler);
        } else {
            throw Error(`SubscriptionCollection does not support for ${this.constructor.name} yet !`)
        }
    }
}
