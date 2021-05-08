import {AfterViewInit, Component, Inject} from '@angular/core';
import {JQ_TOKEN} from './common/jquery.service';

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
  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  ngAfterViewInit(): void {
    this.bindHideSplashEvent();
    this.bindScrollEvents();
  }

  private bindHideSplashEvent(): void {
    this.$(() => {
      this.$('body').addClass('loaded');
    });
  }

  private bindScrollEvents(): void {
    this.$(window).on('scroll', () => {
      if (this.$(window).scrollTop() > 50) {
        this.$('.header-1').addClass('fixed');
      } else {
        this.$('.header-1').removeClass('fixed');
      }
    });

    this.$(window).on('scroll', () => {
      if (this.$(window).scrollTop() > 0) {
        this.$('.header-2').addClass('fixed');
      } else {
        this.$('.header-2').removeClass('fixed');
      }
    });
  }
}
