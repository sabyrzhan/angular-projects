import {AfterViewInit, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {JQ_TOKEN} from '../common/jquery.service';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html'
})
export class NavHeaderComponent implements AfterViewInit{
  constructor(public router: Router,
              @Inject(JQ_TOKEN) private $: any) {
  }

  ngAfterViewInit(): void {
    this.bindMobileMenuOpenOnClick();
    this.bindMobileMenuCloseOnClick();
    this.bindMobileMenuCollapseOnClick()
  }

  bindMobileMenuOpenOnClick(): void {
    this.$('.header .header__bars').on('click', () => {

      const selector = this.$('.header .header__nav');

      if (selector.hasClass('shown')) {
        selector.css('right', '100%');
        selector.removeClass('shown');
      } else {
        selector.css('right', '0');
        selector.addClass('shown');
      }
    });
  }

  bindMobileMenuCloseOnClick(): void {
    this.$('.header .header__nav span').on('click', () => {
      const selector = this.$('.header .header__nav');
      this.toggleMenu(selector);
    });
  }

  private toggleMenu(headerNav: any): void {
    if (headerNav.hasClass('shown')) {
      headerNav.css('right', '100%');
      headerNav.removeClass('shown');
    } else {
      headerNav.css('right', '0');
      headerNav.addClass('shown');
    }
  }

  bindMobileMenuCollapseOnClick(): void {
    this.$(document).on('click', 'a[href^="#"]', (event: any) => {
      event.preventDefault();
      const elementId = this.$(event.target).attr('href');
      if (elementId === '#') { return; }

      this.$('html, body').animate({
        scrollTop: this.$(this.$.attr(event.target, 'href')).offset().top
      }, 1000, 'swing');

      const selector = this.$('.header .header__nav');
      this.toggleMenu(selector);
    });
  }

  getHomeUrl(): string {
    if (this.router.url === '/') {
      return '#hero';
    } else {
      return '/';
    }
  }
}
