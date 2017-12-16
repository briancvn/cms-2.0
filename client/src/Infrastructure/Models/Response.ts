import { ResponseError } from './ResponseError';
import { ResponseWarning } from './ResponseWarning';

export class Response {
    Result: any;
    Error: ResponseError;
    Warning: ResponseWarning;
}
