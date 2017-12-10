import { ValidationErrorMessage } from './ValidationErrorMessage';

export class ResponseError {
    Type: string;
    Error:string;
    ErrorDetails: string[] = [];
    ValidationErrors: ValidationErrorMessage[];
}
