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

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit(): void {
    const navigateFn = (user: User): void => {
      this.router.navigate(['admin/users'], {queryParams: {id: user.id, action: 'view'}});
    };

    if (this.formUser?.id != null) {
      this.dataService.updateUser(this.formUser!).subscribe(navigateFn);
    } else {
      this.dataService.addUser(this.formUser!, this.password!).subscribe(navigateFn);
    }
  }
}
