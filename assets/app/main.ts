import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';     // for having JIT compilation in browser

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);        //starting point of application
