import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('remove the last book', () => {
    const totalBookSize = service.books.length;
    const expectedBook = service.books[service.books.length - 1];

    const removedBook = service.removeLastBook();

    expect(removedBook).toBe(expectedBook);
    expect(service.books.length).toBe(totalBookSize - 1);
  });

  it('delete book emitter called', () => {
    spyOn(service.deleteBookEmitter, 'emit');
    const lastBook = service.books[service.books.length - 1];

    service.removeLastBook();

    expect(service.deleteBookEmitter.emit).toHaveBeenCalledWith(lastBook);
  });
});
