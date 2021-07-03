import {Injectable} from '@angular/core';
import {Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Booking} from './model/Booking';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {
  }

  getRooms(): Observable<Array<Room>> {
    return this.httpClient.get<Array<Room>>(environment.restUrl + '/api/rooms', {withCredentials: true}).pipe(
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
    return this.httpClient.get<Array<Booking>>(environment.restUrl + '/api/bookings?date=' + date).pipe(map(data => {
      const result = new Array<Booking>();
      for (const d of data) {
        result.push(Booking.mapHttpBooking(d));
      }
      return result;
    }));
  }

  getBooking(id: number): Observable<Booking | undefined> {
    return this.httpClient.get<Booking>(environment.restUrl + '/api/bookings/' + id).pipe(map(data => Booking.mapHttpBooking(data)));
  }

  saveBooking(booking: Booking): Observable<Booking | undefined> {
    if (booking.layout) {
      booking.layout = Room.layoutValueToName(booking.layout as string);
    }

    if (booking.room) {
      for (const cap of booking.room.capacities) {
        cap.layout = Room.layoutValueToName(cap.layout as string);
      }
    }
    return this.httpClient.put<Booking>(environment.restUrl + '/api/bookings', booking);
  }

  addBooking(booking: Booking): Observable<Booking> {
    if (booking.layout) {
      booking.layout = Room.layoutValueToName(booking.layout as string);
    }

    if (booking.room) {
      for (const cap of booking.room.capacities) {
        cap.layout = Room.layoutValueToName(cap.layout as string);
      }
    }
    return this.httpClient.post<Booking>(environment.restUrl + '/api/bookings', booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/bookings/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put(environment.restUrl + '/api/users', user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    const request = {
      name: newUser.name,
      password
    };
    return this.httpClient.post(environment.restUrl + '/api/users', request);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.httpClient.put<Room>(environment.restUrl + '/api/rooms', room).pipe(map(data => Room.mapHttpRoom(data)));
  }

  addRoom(newRoom: Room): Observable<Room> {
    return this.httpClient.post<Room>(environment.restUrl + '/api/rooms', newRoom).pipe(map(data => Room.mapHttpRoom(data)));
  }

  deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/rooms/' + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/users/' + id);
  }

  resetPassword(id: number): Observable<any> {
    return this.httpClient.post(environment.restUrl + '/api/users/' + id + '/resetPassword', {});
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.restUrl + '/api/users/' + id).pipe(
      map(data => User.mapHttpUser(data))
    );
  }

  validateUser(username: string, password: string): Observable<{ token: string }> {
    const authData = btoa(`${username}:${password}`);
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + authData)
      .append('Content-Type', 'application/json');
    return this.httpClient.get<{ token: string }>(environment.restUrl + '/api/basicAuth/validate', {headers, withCredentials: true});
  }
}
