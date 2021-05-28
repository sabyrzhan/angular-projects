import { Injectable, EventEmitter } from '@angular/core';
import {Book} from './model/Book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  books: Array<Book> = new Array<Book>();
  deleteBookEmitter = new EventEmitter<Book>();

  constructor() {
    this.books.push(this.createBook('TItle 1', 'author 1', 1));
    this.books.push(this.createBook('TItle 2', 'author 2', 2));
    this.books.push(this.createBook('TItle 3', 'author 3', 3));
  }

  removeLastBook(): Book | null {
    if (this.books.length === 0) {
      this.deleteBookEmitter.error('No more book available');
      return null;
    }

    const removedBook = this.books.pop()!;
    this.deleteBookEmitter.emit(removedBook);

    return removedBook;
  }

  private createBook(title: string, author: string, price: number): Book {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.price = price;
    return book;
  }
}
