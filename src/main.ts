import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Storage deployed to: 0x27292645cB9b3163A0faC2DA562c7C792fbc5e2D
// Cripto deployed to: 0x4E7eFf76bB26a49796F29Ca6bD4E07152D47b670







