import {AfterViewInit, Component, Inject} from '@angular/core';
import {JQ_TOKEN} from './common/jquery.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav-header></nav-header>
    <router-outlet></router-outlet>
    <nav-footer></nav-footer>
  `
})
export class AppComponent implements AfterViewInit{
  title = 'Zapper';
  constructor(@Inject(JQ_TOKEN) private $: any,
              router: Router) {
  }

  ngAfterViewInit(): void {
    this.$(() => {
      this.$('body').addClass('loaded');
    });
  }
}
