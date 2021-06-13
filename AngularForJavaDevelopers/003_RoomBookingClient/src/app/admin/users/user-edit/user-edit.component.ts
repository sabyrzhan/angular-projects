import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';

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
  isPassword1Valid = false;
  isPassword2Valid = false;
  passwordsMatch = false;

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.formResetService.resetUserFormEmitter.subscribe(user => {
      this.user = user;
      this.initializeForm();
    });
  }

  private initializeForm(): void {
    this.formUser = Object.assign({}, this.user);
    this.validateName();
    this.validatePassword(1);
    this.validatePassword(2);
    this.validatePasswordsMatch();
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

  validatePassword(which: number): void {
    switch (which) {
      case 1:
        this.isPassword1Valid = this.password ? this.password.trim().length > 0 : false;
        break;
      case 2:
        this.isPassword2Valid = this.password2 ? this.password2.trim().length > 0 : false;
        break;
    }

    this.validatePasswordsMatch();
  }

  validatePasswordsMatch(): void {
    if (this.password && this.password2) {
      this.passwordsMatch = this.password === this.password2;
    }
  }

  arePasswordsValid(): boolean {
    if (this.formUser?.id) {
      return true;
    } else {
      return this.isPassword1Valid && this.isPassword2Valid && this.passwordsMatch;
    }
  }
}
