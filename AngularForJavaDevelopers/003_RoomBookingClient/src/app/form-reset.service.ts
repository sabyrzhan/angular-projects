import { Injectable, EventEmitter } from '@angular/core';
import {Room} from './model/Room';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {
  resetRoomFormEmitter = new EventEmitter<Room>();
  constructor() { }
}
