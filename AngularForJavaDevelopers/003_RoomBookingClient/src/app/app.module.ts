import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { EditBookingComponent } from './calendar/edit-booking/edit-booking.component';
import {HttpClientModule} from '@angular/common/http';
import {PrefetchUsersService} from './prefetch-users.service';
import {PrefetchRoomsService} from './prefetch-rooms.service';
import { LoginComponent } from './login/login.component';
import {AuthRouteGuardService} from './auth-route-guard.service';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'admin/users', component: UsersComponent, canActivate: [AuthRouteGuardService]
  },
  {
    path: 'admin/rooms', component: RoomsComponent, canActivate: [AuthRouteGuardService]
  },
  {
    path: 'editBooking',
    component: EditBookingComponent,
    resolve: {
      users: PrefetchUsersService,
      rooms: PrefetchRoomsService
    },
    canActivate: [AuthRouteGuardService]
  },
  {
    path: 'addBooking',
    component: EditBookingComponent,
    resolve: {
      users: PrefetchUsersService,
      rooms: PrefetchRoomsService
    },
    canActivate: [AuthRouteGuardService]
  },
  {
    path: '', component: CalendarComponent
  },
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    RoomsComponent,
    UsersComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    EditBookingComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
