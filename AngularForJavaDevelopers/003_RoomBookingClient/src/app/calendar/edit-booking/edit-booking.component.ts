import { Component, OnInit } from '@angular/core';
import {Booking} from '../../model/Booking';
import {Layout, Room} from '../../model/Room';
import {DataService} from '../../data.service';
import {User} from '../../model/User';
import {ActivatedRoute} from '@angular/router';

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
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(r => this.rooms = r);
    this.layouts = Object.entries(Layout);
    this.dataService.getUsers().subscribe(u => this.users = u);
    const id = +this.router.snapshot.queryParams.id;
    this.dataService.getBooking(id).subscribe(b => {
      this.booking = b;
      console.log(this.booking);
    });
  }

}
