import { Component, OnInit } from '@angular/core';
import {Booking} from '../model/Booking';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  bookings = new Array<Booking>();

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(b => {
      this.bookings = b;
    });
  }

  editBooking(id: number): void {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

}
