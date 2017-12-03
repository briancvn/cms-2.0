import 'hammerjs';
import 'underscore';
import 'rxjs/Rx';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './App/AppModule';
import { environment } from './Environments/Environment';
import { VariableNameConstants, CommonConstants } from './Infrastructure';

if (environment.production) {
  enableProdMode();
}

setTimeout(() => {
    window.top[VariableNameConstants.UserContext] = {};
    platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
}, CommonConstants.MEDIUM_TIMEOUT);
