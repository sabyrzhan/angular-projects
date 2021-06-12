import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from '../../../model/Room';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  roomForm?: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.layouts = Object.entries(Layout);
    this.roomForm = this.formBuilder.group({
      roomName: this.room?.name,
      location: this.room?.location
    });

    for (const layout of this.layouts) {
      const layoutCapacity = this.room?.capacities.find(cap => cap.layout === layout[1]);
      const initialCapacity = layoutCapacity ? layoutCapacity.capacity : 0;
      this.roomForm.addControl(`layout${layout[0]}`, this.formBuilder.control(initialCapacity));
    }
  }

  onSubmit(): void {
    if (this.room) {
      this.room.name = this.roomForm?.controls.roomName.value;
      this.room.location = this.roomForm?.controls.location.value;
      if (this.layouts) {
        this.room.capacities = new Array<LayoutCapacity>();
        for (const layout of this.layouts) {
          const capacity = new LayoutCapacity();
          capacity.layout = layout[1];
          capacity.capacity = this.roomForm?.controls[`layout${layout[0]}`].value;
          this.room.capacities.push(capacity);
        }
      }
    }

    console.log(this.room);
  }
}
