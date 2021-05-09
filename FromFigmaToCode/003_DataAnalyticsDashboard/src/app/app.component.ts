import {Component, ElementRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      transition('open => closed', [
        animate('.3s')
      ]),
      transition('closed => open', [
        animate('.3s')
      ])
      ]
    )
  ]
})
export class AppComponent {
  title = 'DataAnalyticsDashboard';
  @ViewChild('menu')
  menu?: ElementRef;
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
