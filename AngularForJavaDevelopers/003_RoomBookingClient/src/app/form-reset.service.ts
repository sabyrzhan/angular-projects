import { Injectable, EventEmitter } from '@angular/core';
import {Room} from './model/Room';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {
  resetRoomFormEmitter = new EventEmitter<Room>();
  resetUserFormEmitter = new EventEmitter<User>();

  constructor() { }
}
