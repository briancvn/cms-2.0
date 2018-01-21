import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ISubscription } from '../Interfaces/ISubscription';
import { Collection } from '../Models/Collection';

@Injectable()
export class SubscriptionCollection extends Collection<ISubscription> {
    subscribe = <T>(observable: Observable<T>, handler: { (data: T): void }, componentId?: string): void => {
        this.push({
            ComponentId: componentId,
            Subscription: observable.subscribe((data) => handler(data))
        });
    }

    unsubscribe = (componentId?: string) : void => {
        if (componentId) {
            let subscriptions = this.filter(x => x.ComponentId === componentId);
            subscriptions.forEach(x => this.remove(x));
        } else {
            this.forEach(x => x.Subscription.unsubscribe());
            this.clean();
        }
    }
}
