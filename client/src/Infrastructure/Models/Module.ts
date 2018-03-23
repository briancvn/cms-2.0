import { EModuleGroup } from '../Enums/EModuleGroup';

export class Module {
    get routePath(): string {
        return this.Name;
    }

    constructor(public Path: string, public Name: string, public Group: EModuleGroup) {}
}
