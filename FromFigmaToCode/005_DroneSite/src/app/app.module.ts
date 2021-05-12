import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuoteSectionComponent} from './quote-section/quote-section.component';
import {GallerySectionComponent} from './gallery-section/gallery-section.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteSectionComponent,
    GallerySectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
