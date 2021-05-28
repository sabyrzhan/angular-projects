import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit, OnDestroy {
  removedBooksCount = 0;
  deleteBookSubscription?: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscribeToDeleteBook();
  }

  private subscribeToDeleteBook(): void {
    this.deleteBookSubscription = this.dataService.deleteBookEmitter.subscribe(
      (deletedBook) => {
        this.removedBooksCount++;
      },
      (error) => {
        alert(error);
      });
  }

  ngOnDestroy(): void {
    this.deleteBookSubscription?.unsubscribe();
  }

  removeLastBook(): void {
    this.dataService.removeLastBook();
  }
}
