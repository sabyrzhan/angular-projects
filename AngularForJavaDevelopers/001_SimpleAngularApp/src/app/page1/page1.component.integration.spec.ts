import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1Component } from './page1.component';
import {DataService} from "../data.service";

describe('Page1Component_IntegrationTest', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;
  let dataService: DataService;
  let removedBooksCount: number;

  beforeEach(async () => {
    dataService = {
      removeLastBook(): void {
        removedBooksCount++;
      }
    } as DataService;

    await TestBed.configureTestingModule({
      declarations: [ Page1Component ],
      providers: [
        {
          provide: DataService, useValue: dataService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    removedBooksCount = 0;
    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test delete last book', () => {
    component.deleteBook();

    expect(removedBooksCount).toEqual(1);
  });
});
