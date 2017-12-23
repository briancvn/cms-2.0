import { ResponseError } from './ResponseError';
import { ResponseWarning } from './ResponseWarning';
import { ResponseValidation } from './ResponseValidation';

export class Response {
    Result: any;
    Error: ResponseError;
    Warning: ResponseWarning;
    ValidationErrors: ResponseValidation[];
}
