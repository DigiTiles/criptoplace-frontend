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
import { NgSelectModule } from '@ng-select/ng-select';
import { PaintingComponent } from './uploader/painting/painting.component';
import { ImageComponent } from './uploader/image/image.component';
import { InformationComponent } from './uploader/information/information.component';
import { StageInfoComponent } from './stage-info/stage-info.component';
import { HeaderComponent } from './header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { InfoPageComponent } from './info-page/info-page.component';
import { AboutDigitilesComponent } from './info-page/about-digitiles/about-digitiles.component';
import { ProjectFeaturesComponent } from './info-page/project-features/project-features.component';
import { ProjectRoadmapComponent } from './info-page/project-roadmap/project-roadmap.component';
import { PricingComponent } from './info-page/pricing/pricing.component';
import { NftComponent } from './info-page/nft/nft.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    UploaderComponent,
    ModalComponent,
    InfoRuComponent,
    InfoEngComponent,
    InfoComponent,
    CurrencySelectorComponent,
    PaintingComponent,
    ImageComponent,
    InformationComponent,
    StageInfoComponent,
    HeaderComponent,
    InfoPageComponent,
    AboutDigitilesComponent,
    ProjectFeaturesComponent,
    ProjectRoadmapComponent,
    PricingComponent,
    NftComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    RouterModule.forRoot([]),
    NgOptimizedImage
  ],
  providers: [MetamaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
