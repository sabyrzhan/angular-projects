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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(rooms => this.rooms = rooms);
    this.route.queryParams.subscribe(param => {
      if (param.id) {
        this.selectRoom(+param.id);
      }
    });
  }

  selectRoom(id: number): void {
    this.selectedRoom = this.rooms.find(r => r.id === id);
    this.router.navigate(['admin/rooms'], {queryParams: {id}});
  }
}
