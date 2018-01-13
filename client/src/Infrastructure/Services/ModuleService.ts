import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { ModuleConstants } from '../Constants/ModuleConstants';
import { EModuleGroup } from '../Enums/EModuleGroup';
import { ERoleGroup } from '../Enums/ERoleGroup';
import { Module } from '../Models/Module';
import { BaseService } from './BaseService';
import { AuthenticateService } from './AuthenticateService';
import { ModuleInstance } from '../Models/ModuleInstance';
import ConfigurationModule from '../Modules/System/Configuration/ConfigurationBoot';

@Injectable()
export class ModuleService extends BaseService {
    modules: Module[] = [];
    moduleInstances: ModuleInstance[] = [];

    private lastModuleId = 1;

    constructor(private authService: AuthenticateService) {
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
        this.moduleInstances.push(new ModuleInstance(
            `cms-module-${this.lastModuleId++}`,
            module.Name,
            module
        ));
    }

    private registerSystyem(): void {
        this.register(new Module(
            ConfigurationModule,
            ModuleConstants.Configuration,
            EModuleGroup.System
        ), ERoleGroup.ADMINISTRATOR)
    }
}
