import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html'
})
export class NavHeaderComponent {
  constructor(public router: Router) {
  }

  getHomeUrl(): string {
    if (this.router.url === '/') {
      return '#hero';
    } else {
      return '/';
    }
  }
}
