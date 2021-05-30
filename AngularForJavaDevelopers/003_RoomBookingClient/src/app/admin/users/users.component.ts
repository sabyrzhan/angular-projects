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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.users = this.dataService.users;
    this.route.queryParams.subscribe(param => {
      if (param.id) {
        this.selectUser(+param.id);
      }
    });
  }

  selectUser(id: number): void {
    this.selectedUser = this.users.find(u => u.id === id);
    this.router.navigate(['admin/users'], {queryParams: {id}});
  }
}
