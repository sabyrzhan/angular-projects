import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {User} from '../../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  selectedUser?: User;
  action?: string;
  statusMessage = 'Please wait. Loading data...';
  isLoadingData = true;
  attemptsCount = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataService.getUsers().subscribe(
      users => {
        this.isLoadingData = false;
        this.users = users;
        this.processUrlParams();
      },
      error => {
        this.attemptsCount++;
        if (this.attemptsCount < 10) {
          this.statusMessage = 'Error occurred while loading. Retrying...';
          this.loadUsers();
        } else {
          this.statusMessage = 'Error occurred while loading. Please contact help center';
        }
        console.error(error);
      }
    );
  }

  processUrlParams(): void {
    this.route.queryParams.subscribe(param => {
      const id = param.id;
      this.action = param.action;
      this.selectedUser = undefined;
      if (id) {
        this.selectedUser = this.users.find(u => u.id === +id);
      }
    });
  }

  selectUser(id: number): void {
    this.router.navigate(['admin/users'], {queryParams: {id, action: 'view'}});
  }

  addUser(): void {
    this.router.navigate(['admin/users'], {queryParams: {action: 'add'}});
    this.formResetService.resetUserFormEmitter.emit(new User());
  }
}
