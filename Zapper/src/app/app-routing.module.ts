import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BlogsComponent} from './blogs/blogs.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'blogs', component: BlogsComponent
  },
  {
    path: 'blogs/:id', component: BlogDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
