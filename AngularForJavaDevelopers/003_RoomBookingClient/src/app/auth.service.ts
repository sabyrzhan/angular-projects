import { Injectable, EventEmitter } from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authenticationEventResult = new EventEmitter<boolean>();

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string): void {
    this.dataService.validateUser(name, password).subscribe(
      v => {
        this.isAuthenticated = true;
        this.authenticationEventResult.emit(this.isAuthenticated);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationEventResult.emit(this.isAuthenticated);
      }
    );
  }

  getRole(): string {
    return 'ADMIN';
  }
}
