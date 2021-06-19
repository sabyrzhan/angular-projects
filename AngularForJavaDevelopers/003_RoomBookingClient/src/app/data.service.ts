import {Injectable} from '@angular/core';
import {Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Booking} from './model/Booking';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }

  getRooms(): Observable<Array<Room>> {
    return of(new Array());
  }

  getUsers(): Observable<Array<User>> {
    return of(new Array());
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return of(new Array());
  }

  getBooking(id: number): Observable<Booking | undefined> {
    return of(undefined);
  }

  saveBooking(booking: Booking): Observable<Booking | undefined> {
    return of(undefined);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return of(booking);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }

  updateUser(user: User): Observable<User> {
    return of(user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    return of(newUser);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(room);
  }

  addRoom(newRoom: Room): Observable<Room> {
    return of(newRoom);
  }

  deleteRoom(id: number): Observable<any> {
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    return of(null);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }
}
