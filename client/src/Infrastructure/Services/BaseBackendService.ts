import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseBackendService {
    constructor(protected http: HttpClient, private apiUrl: string) {}

    public get<T>(method: string): Promise<T> {
        return this.http.get<T>(`api/${this.apiUrl}/${method}?XDEBUG_SESSION_START=PHPSTORM`).toPromise();
    }

    public post<T>(method: string, body: any): Promise<T> {
        return this.http.post<T>(`api/${this.apiUrl}/${method}?XDEBUG_SESSION_START=PHPSTORM`, body).toPromise();
    }
}
