import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { ModuleConstants } from '../Constants/ModuleConstants';
import { EModuleGroup } from '../Enums/EModuleGroup';
import { ERoleGroup } from '../Enums/ERoleGroup';
import { Module } from '../Models/Module';
import { AuthenticateService } from './AuthenticateService';
import { BaseService } from './BaseService';
import { ModuleInstance } from './ModuleInstance';

declare var System: any;

@Injectable()
export class ModuleService extends BaseService {
    modules: Module[] = [];
    instances: ModuleInstance[] = [];

    get moduleInstanceActive(): ModuleInstance {
        return this.instances.find(moduleInstance => moduleInstance.Active);
    }

    private lastModuleId = 1;

    constructor(private authService: AuthenticateService) {
        super();
        this.subscribe(this.authService.onUserContextChanged, () => {
            if (this.userContext.Token) {
                this.init();
            } else {
                this.reset();
            }
        });
    }

    init(): void {
        this.registerSystyem();
    }

    reset(): void {
        this.modules = [];
    }

    register(module: Module, ...roleGroups: ERoleGroup[]): void {
        if (!_.isEmpty(_.intersection(this.userContext.RoleGroups, roleGroups))) {
            this.modules.push(module);
        }
    }

    addInstance(module: Module): void {
        this.instances.unshift(new ModuleInstance(this.lastModuleId++, module.Name, module));
    }

    removeInstance(removeInstance: ModuleInstance): void {
        removeInstance.ComponentRef.instance.subscriptions.unsubscribe();
        let index = this.instances.findIndex(instance => instance.CorrelationId === removeInstance.CorrelationId);
        this.instances.splice(index, 1);

        if (!_.isEmpty(this.instances)) {
            this.setActive(this.instances[this.instances.length > index ? index : index - 1]);
        }
    }

    setActive(moduleInstance: ModuleInstance): void {
        this.instances.forEach(instance => instance.Active = instance.CorrelationId === moduleInstance.CorrelationId);
    }

    private registerSystyem(): void {
        this.register(new Module(
            ModuleConstants.Configuration.Path,
            ModuleConstants.Configuration.Name,
            EModuleGroup.System
        ), ERoleGroup.ADMINISTRATOR);
        this.register(new Module(
            ModuleConstants.User.Path,
            ModuleConstants.User.Name,
            EModuleGroup.System
        ), ERoleGroup.ADMINISTRATOR);
    }
}
