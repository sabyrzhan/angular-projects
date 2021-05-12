import {Component, HostListener} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animateBlur', [
      state('down', style({
        opacity: '.3'
      })),
      state('up', style({
        opacity: '0'
      })),
      transition('down => up', [
        animate('2s')
      ]),
      transition('up => down', [
        animate('2s')
      ])
    ]),
    trigger('animateDrone', [
      state('down', style({
        transform: 'translateY(0)'
      })),
      state('up', style({
        transform: 'translateY(-30px)'
      })),
      transition('down => up', [
        animate('2s')
      ]),
      transition('up => down', [
        animate('2s')
      ])
    ]),
    trigger('toggleMenu', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('open => closed', [
        animate('.3s')
      ]),
      transition('closed => open', [
        animate('.3s')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'DroneSite';
  blurState = 'down';
  droneState = 'down';
  isMenuOpen = false;

  constructor() {
    this.updateMenuState();
  }

  @HostListener('window:resize')
  updateMenuState(): void {
    this.isMenuOpen = window.innerWidth >= 900;
  }

  onEnd(objectName: string): void {
    const fn = (stateName: string) => {
      if (stateName === 'down') {
        return 'up';
      } else {
        return 'down';
      }
    };

    if (objectName === 'blur') {
      this.blurState = fn(this.blurState);
    } else {
      this.droneState = fn(this.droneState);
    }
  }
}
