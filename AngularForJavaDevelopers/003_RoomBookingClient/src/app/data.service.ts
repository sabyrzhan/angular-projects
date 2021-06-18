import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Booking} from './model/Booking';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rooms: Array<Room> = new Array<Room>();
  private users: Array<User> = new Array<User>();
  private bookings: Array<Booking> = new Array<Booking>();

  constructor() {
    this.generateRooms();
    this.generateUsers();
    this.generateBookings();
  }

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms).pipe(delay(150));
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users).pipe(delay(150));
  }

  getBookings(): Observable<Array<Booking>> {
    return of(this.bookings);
  }

  getBooking(id: number): Observable<Booking | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    return booking ? of(booking) : of(undefined);
  }

  saveBooking(booking: Booking): Observable<Booking | undefined> {
    const existingBooking = this.bookings.find(b => b.id === booking.id);
    if (existingBooking) {
      existingBooking.date = booking.date;
      existingBooking.startTime = booking.startTime;
      existingBooking.endTime = booking.endTime;
      existingBooking.title = booking.title;
      existingBooking.layout = booking.layout;
      existingBooking.room = booking.room;
      existingBooking.user = booking.user;
      existingBooking.participants = booking.participants;
    }

    return of(existingBooking);
  }

  addBooking(booking: Booking): Observable<Booking> {
    booking.id = this.bookings[this.bookings.length - 1].id! + 1;
    this.bookings.push(booking);
    return of(booking);
  }

  deleteBooking(id: number): Observable<any> {
    const foundBooking = this.bookings.find(b => b.id === id);
    if (foundBooking) {
      const index = this.bookings.indexOf(foundBooking);
      this.bookings.splice(index, 1);
    }

    return of(null);
  }

  updateUser(user: User): Observable<User> {
    const existingUser = this.users.find(u => u.id === user.id)!;
    existingUser.name = user?.name;

    return of(existingUser);
  }

  addUser(newUser: User, password: string): Observable<User> {
    newUser.id = this.users[this.users.length - 1].id! + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  updateRoom(room: Room): Observable<Room> {
    const originalRoom = this.rooms.find(r => r.id === room.id);
    if (originalRoom) {
      originalRoom.name = room.name;
      originalRoom.location = room.location;
      originalRoom.capacities = room.capacities;
    } else {
      console.error('Original room not found');
    }

    return of(room);
  }

  addRoom(newRoom: Room): Observable<Room> {
    const lastId = this.rooms[this.rooms.length - 1].id;
    if (lastId) {
      const nextId =  lastId + 1;
      newRoom.id = nextId;
    } else {
      newRoom.id = 1;
    }

    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteRoom(id: number): Observable<any> {
    const room = this.rooms.find(r => r.id === id);
    if (room) {
      const index = this.rooms.indexOf(room);
      this.rooms.splice(index, 1);
    }

    return of(room);
  }

  deleteUser(id: number): Observable<any> {
    const user = this.rooms.find(u => u.id === id);
    if (user) {
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
    }
    return of(user);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }

  private generateUsers(): void {
    for (let i = 1; i <= 10; i++) {
      const user = new User();
      user.id = i;
      user.name = 'User' + i;
      this.users.push(user);
    }
  }

  private generateRooms(): void {
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First room';
    room1.location = 'First floor';

    const cap1 = new LayoutCapacity();
    cap1.layout = Layout.THEATER;
    cap1.capacity = 50;
    room1.capacities.push(cap1);

    const cap2 = new LayoutCapacity();
    cap2.layout = Layout.USHAPE;
    cap2.capacity = 20;
    room1.capacities.push(cap2);

    // ==========================
    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second room';
    room2.location = 'Second floor';

    const cap3 = new LayoutCapacity();
    cap3.layout = Layout.THEATER;
    cap3.capacity = 50;

    room2.capacities.push(cap3);

    this.rooms.push(room1);
    this.rooms.push(room2);
  }

  private generateBookings(): void {
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = this.rooms[0];
    booking1.user = this.users[0];
    booking1.layout = Layout.THEATER;
    booking1.title = 'Booking 1';
    booking1.date = '2021-06-14';
    booking1.startTime = '11:00';
    booking1.endTime = '13:00';
    booking1.participants = 13;
    this.bookings.push(booking1);

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = this.rooms[1];
    booking2.user = this.users[1];
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Booking 2';
    booking2.date = '2021-06-14';
    booking2.startTime = '09:00';
    booking2.endTime = '11:00';
    booking2.participants = 4;
    this.bookings.push(booking2);
  }
}
