import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from '../../../model/Room';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';

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

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.formResetService.resetRoomFormEmitter.subscribe(room => {
      this.room = room;
      this.initializeForm();
    });
  }

  private initializeForm(): void {
    this.layouts = Object.entries(Layout);
    this.roomForm = this.formBuilder.group({
      roomName: [this.room?.name, Validators.required],
      location: [this.room?.location, [Validators.required, Validators.minLength(2)]]
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


      const fnNavigate = (newRoom: Room) => {
        this.router.navigate(['admin/rooms'], {queryParams: {action: 'view', id: newRoom.id}});
      };

      if (this.room.id) {
        this.dataService.updateRoom(this.room).subscribe(fnNavigate);
      } else {
        this.dataService.addRoom(this.room).subscribe(fnNavigate);
      }
    }
  }
}
