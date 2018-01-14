import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';

import { ModuleConstants } from '../Constants/ModuleConstants';
import { EModuleGroup } from '../Enums/EModuleGroup';
import { ERoleGroup } from '../Enums/ERoleGroup';
import { Module } from '../Models/Module';
import { ModuleInstance } from '../Models/ModuleInstance';
import { RouteProvider } from '../RouteProvider';
import { AuthenticateService } from './AuthenticateService';
import { BaseService } from './BaseService';

declare var System: any;

@Injectable()
export class ModuleService extends BaseService {
    modules: Module[] = [];
    instances: ModuleInstance[] = [];

    get moduleInstanceActive(): ModuleInstance {
        return this.instances.find(moduleInstance => moduleInstance.Active);
    }

    private lastModuleId = 1;

    constructor(private authService: AuthenticateService, private router: Router) {
        super();
        this.authService.onUserContextChanged.subscribe(() => {
            if (this.userContext.Token) {
                this.init();
            } else {
                this.reset();
            }
        })
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

    addModuleInstance(module: Module): void {
        this.instances.unshift(new ModuleInstance(this.lastModuleId++, module.Name, module));
    }

    setActive(moduleInstance: ModuleInstance): void {
        this.instances.forEach(instance => instance.Active = instance.CorrelationId === moduleInstance.CorrelationId);
    }

    private registerSystyem(): void {
        this.register(new Module(
            ModuleConstants.Configuration.Path,
            ModuleConstants.Configuration.Name,
            EModuleGroup.System
        ), ERoleGroup.ADMINISTRATOR)
        this.register(new Module(
            ModuleConstants.Configuration.Path,
            ModuleConstants.User.Name,
            EModuleGroup.System
        ), ERoleGroup.ADMINISTRATOR)
    }
}
