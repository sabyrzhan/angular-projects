import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../model/Room';
import {Router} from '@angular/router';
import {DataService} from '../../../data.service';
import {RoomService} from '../../../room.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room?: Room;
  errorMessage?: string;

  constructor(private router: Router,
              private dataService: DataService,
              private roomService: RoomService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.roomService.roomLoadedEmitter.subscribe(room => {
      this.errorMessage = undefined;
      this.room = room;
    });
  }

  editRoom(): void {
    this.router.navigate(['admin/rooms'], {queryParams: {action: 'edit', id: this.room?.id}});
  }

  deleteRoom(): void {
    this.errorMessage = undefined;
    if (this.room && this.room.id) {
      this.dataService.deleteRoom(this.room.id).subscribe(
        v => {
          this.roomService.roomUpdatedEmitter.emit('Room deleted successfully!');
          this.router.navigate(['admin/rooms']);
        },
        error => {
          this.errorMessage = 'Error while deleting room. Please try again!';
        });
    } else {
      console.error('Room is null');
    }
  }

  canEdit(): boolean {
    return this.authService.canEdit();
  }
}
