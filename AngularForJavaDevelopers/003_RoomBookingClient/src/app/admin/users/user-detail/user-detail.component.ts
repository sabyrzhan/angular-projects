import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../model/User';
import {Router} from '@angular/router';
import {DataService} from '../../../data.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input()
  user?: User;
  @Output()
  userDataChangedEmitter = new EventEmitter();

  errorMessage?: string;
  statusMessage?: string;

  constructor(private router: Router,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.router.navigate(['admin/users'], {queryParams: {action: 'edit', id: this.user?.id}});
  }

  deleteUser(): void {
    if (this.user && this.user.id) {
      this.errorMessage = 'Deleting user...';
      this.dataService.deleteUser(this.user.id).subscribe(
        v => {
          this.router.navigate(['admin/users']);
          this.userDataChangedEmitter.emit();
        },
        error => {
          this.errorMessage = 'Error deleting user. Please try again';
        });
    } else {
      console.error('User is null');
    }
  }

  resetPassword(): void {
    if (this.user && this.user.id) {
      this.errorMessage = 'Resetting password...';
      this.dataService.resetPassword(this.user.id).subscribe(
        v => {
          this.errorMessage = undefined;
          this.statusMessage = 'Password reset successfully';
          this.userDataChangedEmitter.emit();
        },
        error => {
          this.errorMessage = 'Error resetting password. Please try again.';
        });
    } else {
      console.error('User is null');
    }
  }

  canEdit(): boolean {
    return this.authService.canEdit();
  }
}
