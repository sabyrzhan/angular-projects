import { Component, OnInit } from '@angular/core';
import {Booking} from '../../model/Booking';
import {Layout, Room} from '../../model/Room';
import {DataService} from '../../data.service';
import {User} from '../../model/User';

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(r => this.rooms = r);
    this.layouts = Object.entries(Layout);
    this.dataService.getUsers().subscribe(u => this.users = u);
  }

}
