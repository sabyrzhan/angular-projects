import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageNumber = 1;

  @Input()
  footer?: FooterComponent;

  @Output()
  pageChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  changePage(page: number): void {
    this.pageNumber = page;
    this.footer!.renderTime = new Date();
    this.pageChanged.emit(page);
  }
}
