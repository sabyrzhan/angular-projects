import { Injectable, EventEmitter } from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authenticationEventResult = new EventEmitter<boolean>();
  role?: string;

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string): void {
    this.dataService.validateUser(name, password).subscribe(
      v => {
        this.isAuthenticated = true;
        this.setupRole();
        this.authenticationEventResult.emit(this.isAuthenticated);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationEventResult.emit(this.isAuthenticated);
      }
    );
  }

  logout(): void {
    this.dataService.logout().subscribe(v => {
      this.isAuthenticated = false;
      this.authenticationEventResult.emit(false);
    });
  }

  setupRole(): void {
    this.dataService.getRole().subscribe(data => {
      this.role = data.role;
      console.log('Role', this.role);
    });
  }

  checkIfAuthenticated(): void {
    this.dataService.getRole().subscribe(
      data => {
        this.role = data.role;
        this.isAuthenticated = !!data.role;
        this.authenticationEventResult.emit(this.isAuthenticated);
      },
      error => {
        console.error('Error', error.message);
        this.isAuthenticated = false;
        this.authenticationEventResult.emit(false);
      });
  }

  canEdit(): boolean {
    return this.role === 'ROLE_ADMIN';
  }
}
