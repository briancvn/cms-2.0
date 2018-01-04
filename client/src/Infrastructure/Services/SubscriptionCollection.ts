import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';

import { Collection } from '../Models/Collection';

@Injectable()
export class SubscriptionCollection extends Collection<Subscription> {
    subscribe = <T>(observable: Observable<T>, handler: { (data: T): void }): void => {
        this.push(observable.subscribe((data) => handler(data)));
    }

    unsubscribe = () : void => {
        this.forEach(subscribe => subscribe.unsubscribe());
    }
}
