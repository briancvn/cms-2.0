import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';
import { Subscribable } from './Subscribable';

declare var settings: ISettings;
declare var userContext: Authenticate;

export abstract class BaseService extends Subscribable {
    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }
    set userContext(value: Authenticate) { userContext = value; }
}
