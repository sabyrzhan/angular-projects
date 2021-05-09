import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataAnalyticsDashboard';
  @ViewChild('menu')
  menu?: ElementRef;

  handleClickMenu(): void {
    const div = this.menu!.nativeElement;
    if (div.style.display === 'block') {
      div.style.display = 'none';
    } else {
      div.style.display = 'block';
    }
  }
}
