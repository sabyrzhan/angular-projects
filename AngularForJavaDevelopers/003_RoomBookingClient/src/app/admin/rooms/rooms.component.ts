import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Room} from '../../model/Room';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Array<Room> = new Array<Room>();
  selectedRoom?: Room;
  action?: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(rooms => this.rooms = rooms);
    this.route.queryParams.subscribe(param => {
      this.action = param.action;
      this.selectedRoom = undefined;
      if (param.id) {
        this.selectedRoom = this.rooms.find(r => r.id === +param.id);
      }

      if (this.action === 'add') {
        this.selectedRoom = new Room();
      }
    });
  }

  selectRoom(id: number): void {
    this.router.navigate(['admin/rooms'], {queryParams: {id, action: 'view'}});
  }

  addRoom(): void {
    this.router.navigate(['admin/rooms'], {queryParams: {action: 'add'}});
  }
}
