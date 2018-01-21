import { Subscription } from 'rxjs/Rx';

export interface ISubscription {
    ComponentId?: string;
    Subscription: Subscription;
}
