import {Injectable} from '@angular/core';
import {Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Booking} from './model/Booking';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {
  }

  getRooms(): Observable<Array<Room>> {
    return this.httpClient.get<Array<Room>>(environment.restUrl + '/api/rooms').pipe(
      map((data: Array<Room>) => {
        const result = new Array<Room>();
        for (const d of data) {
          result.push(Room.mapHttpRoom(d));
        }
        return result;
      })
    );
  }

  getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(environment.restUrl + '/api/users').pipe(
      map((data: Array<User>) => {
        const result = new Array<User>();
        for (const d of data) {
          result.push(User.mapHttpUser(d));
        }
        return result;
      })
    );
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

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.restUrl + '/api/users/' + id).pipe(
      map(data => User.mapHttpUser(data))
    );
  }
}
