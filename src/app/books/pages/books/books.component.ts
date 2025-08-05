import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { BooksActions } from '../../state/books.actions';
import { selectBooks } from '../../state/books.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [AsyncPipe],
  providers: [IceAndFireService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  standalone: true,
})
export class BooksComponent implements OnInit {
  public books$;

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
  ) {
    this.books$ = this.store.select(selectBooks);
  }

  public ngOnInit(): void {
    console.log('hello world')

    this.iceAndFireService
      .getBooks()
      .subscribe(books => {
        this.store.dispatch(BooksActions.retrievedBookList({ books }))
      });
  }
}
