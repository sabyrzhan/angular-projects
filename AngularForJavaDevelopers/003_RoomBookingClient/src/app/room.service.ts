import { Injectable, EventEmitter } from '@angular/core';
import {Room} from './model/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomLoadedEmitter = new EventEmitter<Room>();
  roomUpdatedEmitter = new EventEmitter<string>();

  constructor() { }
}
