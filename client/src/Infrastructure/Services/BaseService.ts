import { ISettings } from '../Interfaces/ISettings';
import { Authenticate } from '../Models';

declare var settings: ISettings;
declare var userContext: Authenticate;

export abstract class BaseService {
    readonly settings = settings;
    readonly userContext = userContext;
}
