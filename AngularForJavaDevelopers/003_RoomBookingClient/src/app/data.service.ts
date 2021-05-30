import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from './model/Room';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  rooms: Array<Room> = new Array<Room>();
  users: Array<User> = new Array<User>();

  constructor() {
    this.generateRooms();
    this.generateUsers();
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
}
