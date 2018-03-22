import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './App/AppModule';
import { environment } from './Environments/Environment';
import { VariableNameConstants, CommonConstants } from './Infrastructure';
import { hmrBootstrap } from './hmr';

if (environment.production) {
    enableProdMode();
}

declare var global;

setTimeout(() => {
    global[VariableNameConstants.UserContext] = {};
    global[VariableNameConstants.Settings] = {};
    //platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
    const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

    if (environment.hmr) {
        if (module['hot']) {
            hmrBootstrap(module, bootstrap);
        } else {
            console.error('HMR is not enabled for webpack-dev-server!');
            console.log('Are you using the --hmr flag for ng serve?');
        }
    } else {
        bootstrap();
    }
}, CommonConstants.MEDIUM_TIMEOUT);
