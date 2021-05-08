import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './nav/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './content/home/home.component';
import {ContactsComponent} from './content/contacts/contacts.component';
import {ProductListComponent} from './content/product-list/product-list.component';
import {AuthService} from './shared/auth.service';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import {SwiperModule} from 'swiper/angular';
import {JQ_TOKEN} from './shared/jqyery.service';

const globalWindow = window as never;
const jQuery = globalWindow['$'];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContactsComponent,
    ProductListComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule
  ],
  providers: [
    AuthService,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
