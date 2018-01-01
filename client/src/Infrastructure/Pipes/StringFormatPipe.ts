import { PipeTransform, Pipe } from "@angular/core";

import { StringUtils } from "../Utils/StringUtils";

@Pipe({ 
    name: "stringFormat"
})
export class StringFormatPipe implements PipeTransform {
    transform(str: string, ...params: string[]): string {
        return StringUtils.formatString(str, ...params);
    }
}
