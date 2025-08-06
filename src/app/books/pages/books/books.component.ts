import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { BooksActions } from '../../state/books.actions';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectAllBooks } from '../../state/books.selectors';
import { Observable } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { BookComponent } from "../../components/book-component/book-component";

@Component({
  selector: 'app-books',
  imports: [AsyncPipe, RouterLink, BookComponent],
  providers: [IceAndFireService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  standalone: true,
})
export class BooksComponent implements OnInit {
  public books$: Observable<ReadonlyArray<Book>>;

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
  ) {
    this.books$ = this.store.select(selectAllBooks);
  }

  public ngOnInit(): void {
    this.iceAndFireService
      .getBooks()
      .subscribe(books => {
        this.store.dispatch(BooksActions.loadBookList({ books }))
      });
  }
}
