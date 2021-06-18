import { Component, OnInit } from '@angular/core';
import {Booking} from '../model/Booking';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  bookings = new Array<Booking>();
  selectedDate?: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params.date;
      if (!this.selectedDate) {
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      }
      this.dataService.getBookings(this.selectedDate).subscribe(b => {
        this.bookings = b;
      });
    });
  }

  editBooking(id: number): void {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking(): void {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number): void {
    this.dataService.deleteBooking(id).subscribe(v => this.router.navigate(['/']));
  }

  onChangeDate(): void {
   this.router.navigate(['/'], {queryParams: {date: this.selectedDate}});
  }
}
