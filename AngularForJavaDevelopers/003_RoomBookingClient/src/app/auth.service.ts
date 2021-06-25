import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor() { }

  authenticate(name: string, password: string): boolean {
    if (name === 'test' && password === 'test') {
      this.isAuthenticated = true;
    }

    return this.isAuthenticated;
  }
}
