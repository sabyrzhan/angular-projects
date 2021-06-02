import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {User} from '../../model/User';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  selectedUser?: User;
  action?: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.route.queryParams.subscribe(param => {
      const id = param.id;
      const action = param.action;
      if (id) {
        this.selectedUser = this.users.find(u => u.id === +id);
        this.action = action;
      }
    });
  }

  selectUser(id: number): void {
    this.router.navigate(['admin/users'], {queryParams: {id, action: 'view'}});
  }
}
