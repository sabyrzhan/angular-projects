import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './content/home/home.component';
import {ContactsComponent} from './content/contacts/contacts.component';
import {ProductListComponent} from './content/product-list/product-list.component';
import {AboutComponent} from './content/about/about.component';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'contacts', component: ContactsComponent
  },
  {
    path: 'products', component: ProductListComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'account', component: AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
