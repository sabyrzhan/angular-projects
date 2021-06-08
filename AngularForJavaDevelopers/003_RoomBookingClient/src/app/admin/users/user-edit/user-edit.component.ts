import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';

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
  password?: string;
  password2?: string;

  nameIsValid = false;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
    this.validateName();
  }

  onSubmit(): void {
    const navigateFn = (user: User): void => {
      this.router.navigate(['admin/users'], {queryParams: {id: user.id, action: 'view'}});
    };

    if (this.formUser) {
      if (this.formUser?.id != null) {
        this.dataService.updateUser(this.formUser).subscribe(navigateFn);
      } else {
        if (this.password) {
          this.dataService.addUser(this.formUser, this.password).subscribe(navigateFn);
        } else {
          console.error('failed to add user. Password is null');
        }
      }
    } else {
      console.error('failed to add/update user. formUser is null');
    }
  }

  validateName(): void {
    if (this.formUser && this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    }
  }
}
