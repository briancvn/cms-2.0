import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { Collection } from './Collection';

export class SubscriptionCollection extends Collection<Subscription> {
    subscribe<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        this.push(observable.subscribe((data) => handler(data)));
    }

    unsubscribe(): void {
        this.forEach(x => x.unsubscribe());
        this.clear();
    }
}
