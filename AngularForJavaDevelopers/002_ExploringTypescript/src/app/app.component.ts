import { Component } from '@angular/core';
import {Book} from '../model/Model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExploringTypescript';

  readonly CLASS_LEVEL_CONST = 1;

  constructor() {
    //this.someMethod();
    this.someObjects();
  }

  someObjects(): void {
    const book = new Book();
    book.author = 'SomeAuthor';
    book.title = 'SomeTitle';
    book.price = 10;
    console.log('' + book); // toString works only when concatenating with other string
  }

  someMethod(): void {
    let  firstVariable: number;
    const constVariable = 1;
    firstVariable = 1;

    let array1 = [1,2,3,4,5];
    this.printArray(array1);

    let i = 6;
    do {
      array1.push(i++);
    } while (i <= 10);

    array1.push(11);
    array1.push(12);

    this.printArray(array1);

    console.log('Printing with indexes:');

    for(const idx in array1) {
      console.log(array1[idx]);
    }

    console.log('Print with lambda');
    array1.forEach((val, idx, arr) => {
      console.log(`Index: ${idx} and value: ${val}`);
    });
  }

  printArray(arr: any[]): void {
    for (const val of arr) {
      console.log(val);
    }
  }
}
