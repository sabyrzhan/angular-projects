import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {Router} from '@angular/router';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input()
  user?: User;

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.router.navigate(['admin/users'], {queryParams: {action: 'edit', id: this.user?.id}});
  }

  deleteUser(): void {
    if (this.user && this.user.id) {
      this.dataService.deleteUser(this.user.id).subscribe(v => {
        this.router.navigate(['admin/users']);
      });
    } else {
      console.error('User is null');
    }
  }

  resetPassword(): void {
    if (this.user && this.user.id) {
      this.dataService.resetPassword(this.user.id).subscribe(v => {
        console.log('Password reset');
      });
    } else {
      console.error('User is null');
    }
  }
}
