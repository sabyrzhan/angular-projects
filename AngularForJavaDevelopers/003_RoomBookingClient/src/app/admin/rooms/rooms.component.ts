import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Room} from '../../model/Room';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';
import {RoomService} from '../../room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Array<Room> = new Array<Room>();
  action?: string;
  loadingData = true;
  statusMessage = 'Please wait. Loading data...';
  message?: string;
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms();
    this.roomService.roomUpdatedEmitter.subscribe(message => {
      this.message = message;
    });
  }

  loadRooms(): void {
    this.route.queryParams.subscribe(param => {
      this.action = param.action;
      this.dataService.getRooms().subscribe(
        rooms => {
          this.reloadAttempts = 0;
          this.rooms = rooms;
          this.loadingData = false;

          if (param.id) {
            const room = this.rooms.find(r => r.id === +param.id);
            this.roomService.roomLoadedEmitter.emit(room);
          }

          if (this.action === 'add') {
            this.formResetService.resetRoomFormEmitter.emit(new Room());
          }
        },
        error => {
          this.reloadAttempts++;
          if (this.reloadAttempts < 10) {
            this.statusMessage = 'Error data while loading data. Retrying...';
            this.loadRooms();
          } else {
            this.statusMessage = 'Error data while loading data. Please contact support.';
          }
          console.error(error);
        }
      );
    });
  }

  selectRoom(id: number): void {
    this.message = undefined;
    this.router.navigate(['admin/rooms'], {queryParams: {id, action: 'view'}});
  }

  addRoom(): void {
    this.message = undefined;
    this.router.navigate(['admin/rooms'], {queryParams: {action: 'add'}});
  }
}
