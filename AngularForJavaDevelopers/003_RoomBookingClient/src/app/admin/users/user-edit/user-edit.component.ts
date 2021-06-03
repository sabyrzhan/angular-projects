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

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit(): void {
    this.dataService.updateUser(this.formUser!).subscribe(updatedUser => {
      this.router.navigate(['admin/users'], {queryParams: {id: updatedUser.id, action: 'view'}});
    });
  }
}
