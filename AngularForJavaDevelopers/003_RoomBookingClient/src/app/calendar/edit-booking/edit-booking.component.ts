import { Component, OnInit } from '@angular/core';
import {Booking} from '../../model/Booking';
import {Layout, Room} from '../../model/Room';
import {DataService} from '../../data.service';
import {User} from '../../model/User';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  booking?: Booking;
  rooms = new Array<Room>();
  layouts: [string, Layout][] = [];
  users = Array<User>();

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(r => this.rooms = r);
    this.layouts = Object.entries(Layout);
    this.dataService.getUsers().subscribe(u => this.users = u);
    const id = this.activatedRoute.snapshot.queryParams.id;
    if (id) {
      this.dataService.getBooking(+id).subscribe(b => {
        this.booking = b;
      });
    } else {
      this.booking = new Booking();
    }
  }

  onSubmit(): void {
    if (this.booking) {
      if (this.booking.id) {
        this.dataService.saveBooking(this.booking).subscribe(b => {
          this.router.navigate(['/']);
        });
      } else {
        this.dataService.addBooking(this.booking).subscribe(b => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
