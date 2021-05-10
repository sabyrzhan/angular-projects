import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {IconPrefix, IconName} from '@fortawesome/fontawesome-svg-core';

import {
  transition,
  animate, trigger, state, style
} from '@angular/animations';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        clipPath: 'circle(100% at 50% 50%)'
      })),
      state('closed', style({
        clipPath: 'circle(0% at 100% 0%)'
      })),
      transition('open => closed', [
        animate('.3s ease-in-out')
      ]),
      transition('closed => open', [
        animate('.3s ease-in-out')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'CarSalesSite';
  isOpen = false;

  @ViewChild('filter')
  containerDiv?: ElementRef;

  constructor() {
    document.addEventListener('mouseup', this.toggleMenu.bind(this));
  }

  toggleMenu(e?: any): void {
    if (!this.containerDiv!.nativeElement.contains(e.target)) {
      this.isOpen = false;
    }
  }

  toggleHeart(iconComponent: FaIconComponent): void {
    const icon = iconComponent.icon as [IconPrefix, IconName];
    if (icon[0] === 'far') {
      icon[0] = 'fas';
    } else {
      icon[0] = 'far';
    }
    iconComponent.render();
  }
}
