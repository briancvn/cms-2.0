import { ResponseError } from './ResponseError';
import { EResponseErrorKind } from '../Enums/EResponseErrorKind';

export class Response {
    Result: any;
    StatusCode: number;
    Errors: ResponseError[];
    ErrorKind: EResponseErrorKind;
    ErrorTitle: string;
}
