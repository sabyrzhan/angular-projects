import { Component, OnInit } from '@angular/core';
import {Booking} from '../../model/Booking';
import {Layout, Room} from '../../model/Room';
import {DataService} from '../../data.service';
import {User} from '../../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  booking?: Booking;
  rooms?: Array<Room>;
  users?: Array<User>;
  errorMessage?: string;

  layouts: [string, Layout][] = [];

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.errorMessage = undefined;
    this.rooms = this.activatedRoute.snapshot.data.rooms;
    this.users = this.activatedRoute.snapshot.data.users;
    this.layouts = Object.entries(Layout);
    const id = this.activatedRoute.snapshot.queryParams.id;
    if (id) {
      this.dataService.getBooking(+id)
        .pipe(map(booking => {
          booking!.room = this.rooms?.find(r => r.id === booking?.room?.id);
          booking!.user = this.users?.find(u => u.id === booking?.user?.id);
          return booking;
        }))
        .subscribe(
          b => {
            console.log('Booking', b);
            this.booking = b;
          },
          error => {
            this.errorMessage = 'Error while loading booking.';
          });
    } else {
      this.booking = new Booking();
    }
  }

  onSubmit(): void {
    if (this.booking) {
      if (this.booking.id) {
        this.dataService.saveBooking(this.booking).subscribe(
          b => {
            this.router.navigate(['/']);
          },
          error => {
            this.errorMessage = 'Server error while updating booking. Please try again.';
            console.error(error);
          });
      } else {
        this.dataService.addBooking(this.booking).subscribe(
          b => {
            this.router.navigate(['/']);
          },
          error => {
            this.errorMessage = 'Server error while saving booking. Please try again.';
            console.error(error);
          });
      }
    }
  }
}
