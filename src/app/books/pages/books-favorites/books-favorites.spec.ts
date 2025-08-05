import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFavorites } from './books-favorites';

describe('BooksFavorites', () => {
  let component: BooksFavorites;
  let fixture: ComponentFixture<BooksFavorites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksFavorites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksFavorites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
