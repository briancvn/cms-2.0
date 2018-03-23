import { Pipe, PipeTransform } from '@angular/core';

import { CommonConstants } from '../Constants/CommonConstants';
import { Profile } from '../Models/Profile';
import { StringUtils } from '../Utils/StringUtils';

@Pipe({ name: 'fullname' })
export class FullnamePipe implements PipeTransform {
    transform(profile?: Profile): string {
        return profile ? StringUtils.join(CommonConstants.Space, profile.FirstName, profile.LastName) : null;
    }
}
