import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlaceComponent } from './place/place.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ModalComponent } from './modal/modal.component';
import { InfoRuComponent } from './info-ru/info-ru.component';
import { InfoEngComponent } from './info-eng/info-eng.component';
import { InfoComponent } from './info/info.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MetamaskService } from './metamask/metamask.service';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    UploaderComponent,
    ModalComponent,
    InfoRuComponent,
    InfoEngComponent,
    InfoComponent,
    CurrencySelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [MetamaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
