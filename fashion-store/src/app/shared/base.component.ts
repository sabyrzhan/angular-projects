import {User} from './user.model';
import {AuthService} from './auth.service';

export abstract class BaseComponent {
  currentUser?: User;

  constructor(private authService: AuthService) {
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
