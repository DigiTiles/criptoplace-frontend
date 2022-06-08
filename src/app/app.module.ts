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

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    UploaderComponent,
    ModalComponent,
    InfoRuComponent,
    InfoEngComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
