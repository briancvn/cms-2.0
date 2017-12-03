import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseBackendService {
    constructor(protected http: HttpClient, private apiUrl: string) {}

    // tslint:disable-next-line no-any
    public get<T>(method: string): Promise<T> {
        return this.http.get<T>(`api/${this.apiUrl}/${method}`).toPromise();
    }

    public post<T>(method: string, body: any): Promise<T> {
        return this.http.post<T>(`api/${this.apiUrl}/${method}`, body).toPromise();
    }
}
