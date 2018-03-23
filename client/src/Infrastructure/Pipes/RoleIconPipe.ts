import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

import { ERoleGroup } from '../Enums/ERoleGroup';

@Pipe({ name: 'roleIcon' })
export class RoleIconPipe implements PipeTransform {
    transform(roles?: ERoleGroup[]): string {
        if (!_.isEmpty(roles)) {
            if (!_.isEmpty(_.intersection(roles, [ERoleGroup[ERoleGroup.ADMINISTRATOR], ERoleGroup[ERoleGroup.MANAGER]]))) {
                return 'fa-tachometer';
            } else if (_.contains(roles, ERoleGroup[ERoleGroup.AUTHORIZED])) {
                return 'fa-cog';
            }
        }

        return 'fa-user-circle';
    }
}
