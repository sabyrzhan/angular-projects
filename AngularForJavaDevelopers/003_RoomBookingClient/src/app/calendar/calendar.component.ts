import { Component, OnInit } from '@angular/core';
import {Booking} from '../model/Booking';
import {DataService} from '../data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  bookings = new Array<Booking>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(b => {
      this.bookings = b;
    });
  }

}
