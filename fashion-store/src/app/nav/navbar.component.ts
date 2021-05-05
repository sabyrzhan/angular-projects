import {Component} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {BaseComponent} from '../shared/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent extends BaseComponent {
  constructor(authService: AuthService) {
    super(authService);
  }
}
