import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input()
  user?: User;
  message?: string;
  formUser?: User;

  constructor() { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit(): void {
    console.log(this.formUser);
  }
}


