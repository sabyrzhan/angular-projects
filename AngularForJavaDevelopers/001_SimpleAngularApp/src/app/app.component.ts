import {Component, ViewChild} from '@angular/core';
import {Page2Component} from './page2/page2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SimpleAngularApp';

  @ViewChild('page2')
  page2?: Page2Component;

  incrementPageHit(page: number): void {
    if (page === 2) {
      this.page2!.incrementHit();
    }
  }
}
