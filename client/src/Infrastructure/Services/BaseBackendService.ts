import { IHttpParam } from '../Interfaces/IHttpParam';
import { BaseService } from './BaseService';
import { HttpClientService } from './HttpClientService';
import { SubscriptionCollection } from './SubscriptionCollection';

export abstract class BaseBackendService extends BaseService {
    constructor(protected http: HttpClientService,
        private apiUrl: string,
        private authenticateService = true,
        subscriptions?: SubscriptionCollection
    ) {
        super(subscriptions);
    }

    public modalGet<T>(param: IHttpParam): Promise<T> {
        param.IsModalRequest = true;
        return this.get<T>(param);
    }

    public get<T>(param: IHttpParam): Promise<T> {
        return this.http.httpGet<T>(this.getHttpParam(param));
    }

    public modalPost<T>(param: IHttpParam): Promise<T> {
        param.IsModalRequest = true;
        return this.post<T>(param);
    }

    public post<T>(param: IHttpParam): Promise<T> {
        return this.http.httpPost<T>(this.getHttpParam(param));
    }

    private getHttpParam(param: IHttpParam): IHttpParam {
        param.Url = param.Url ? param.Url : `${this.apiUrl}/${param.Method}`;
        return param;
    }
}
