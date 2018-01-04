import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';

declare var settings: ISettings;
declare var userContext: Authenticate;

export abstract class BaseService {
    get settings(): ISettings { return settings; }
    get userContext(): Authenticate { return userContext; }
}
