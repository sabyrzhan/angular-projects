import {Layout, Room} from './Room';
import {User} from './User';

export class Booking {
  id?: number;
  room?: Room;
  user?: User;
  layout?: Layout;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  participants?: number;

  static mapHttpBooking(data: Booking): Booking {
    const result = new Booking();
    result.id = data.id;
    if (data.room) {
      result.room = Room.mapHttpRoom(data.room);
    }

    if (data.user) {
      result.user = User.mapHttpUser(data.user);
    }

    if (data.layout) {
      result.layout = Room.layoutFromValue(data.layout);
    }
    result.title = data.title;
    result.date = data.date;
    result.startTime = data.startTime;
    result.endTime = data.endTime;
    result.participants = data.participants;

    return result;
  }

  getDateAsDate(): Date | null {
    if (this.date) {
      return new Date(this.date);
    } else {
      return null;
    }
  }
}
