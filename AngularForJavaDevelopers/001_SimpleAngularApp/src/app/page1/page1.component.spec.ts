import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1Component } from './page1.component';
import {DataService} from "../data.service";

describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test delete last book', () => {
    const dataService = fixture.debugElement.injector.get(DataService);
    const initialBooksSize = dataService.books.length;

    component.deleteBook();

    expect(dataService.books.length).toEqual(initialBooksSize - 1);
  });
});
