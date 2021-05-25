export enum City {
  ALMARTY, ASTANA, SEMEY, KARAGANDY
}

export enum AirportCity {
  ALA = 'Almaty',  AST = 'Astana', KRG = 'Karaganda', SEM = 'Semey'
}

export class Book {
  title?: string;
  author?: string;
  price?: number;

  toString(): string {
    return `title: ${this.title} and author: ${this.author}`;
  }
}
