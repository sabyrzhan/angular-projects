import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from '../../../model/Room';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  @Input()
  room?: Room;

  layouts?: [string, Layout][];
  layout = Layout;

  roomForm = new FormGroup({
    roomName: new FormControl('roomName'),
    location: new FormControl('location')
  });

  constructor() { }

  ngOnInit(): void {
    this.layouts = Object.entries(Layout);
    this.roomForm.patchValue({
      roomName: this.room?.name,
      location: this.room?.location
    });
    for (const layout of this.layouts) {
      this.roomForm.addControl(`layout${layout[0]}`, new FormControl(`layout${layout[0]}`));
    }
  }

  onSubmit(): void {
    if (this.room) {
      this.room.name = this.roomForm.controls.roomName.value;
      this.room.location = this.roomForm.controls.location.value;
      if (this.layouts) {
        this.room.capacities = new Array<LayoutCapacity>();
        for (const layout of this.layouts) {
          const capacity = new LayoutCapacity();
          capacity.layout = layout[1];
          capacity.capacity = this.roomForm.controls[`layout${layout[0]}`].value;
          this.room.capacities.push(capacity);
        }
      }
    }

    console.log(this.room);
  }
}
