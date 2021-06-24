import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {User} from './model/User';
import {Observable} from 'rxjs';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchUsersService implements Resolve<Array<User>>{

  constructor(private dataService: DataService) { }

  resolve(): Observable<Array<User>> {
    return this.dataService.getUsers();
  }
}
