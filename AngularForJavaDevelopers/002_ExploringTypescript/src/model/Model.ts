export class Book {
  title?: string;
  author?: string;
  price?: number;

  toString(): string {
    return `title: ${this.title} and author: ${this.author}`;
  }
}
