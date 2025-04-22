import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Storage deployed to: 0x1dfDc08F0C8864da6Ef980fe5AeeCcCb6CF0fA47
// Cripto deployed to: 0x3C27c4100dbC3Ee94Eb3600610b0e7A4a6acCf0D






