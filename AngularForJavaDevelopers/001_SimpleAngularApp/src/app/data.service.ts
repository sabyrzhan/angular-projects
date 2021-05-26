import { Injectable } from '@angular/core';
import {Book} from './model/Book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  books: Array<Book> = new Array<Book>();

  constructor() {
    this.books.push(this.createBook('TItle 1', 'author 1', 1));
    this.books.push(this.createBook('TItle 2', 'author 2', 2));
    this.books.push(this.createBook('TItle 3', 'author 3', 3));
  }

  removeLastBook(): Book | null {
    if (this.books.length === 0) {
      return null;
    }

    return this.books.pop()!;
  }

  private createBook(title: string, author: string, price: number): Book {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.price = price;
    return book;
  }
}
