import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {SwiperModule} from 'swiper/angular';
import {JQ_TOKEN} from './common/jquery.service';
import {BlogsComponent} from './blogs/blogs.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
import {NavHeaderComponent} from './nav-header/nav-header.component';
import {NavFooterComponent} from './nav-footer/nav-footer.component';

const gWindow = window as never;
const jQuery = gWindow['$'];

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    NavFooterComponent,
    HomeComponent,
    BlogsComponent,
    BlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule
  ],
  providers: [
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
