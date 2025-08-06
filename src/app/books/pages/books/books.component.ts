import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { BooksActions } from '../../state/books.actions';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectAllBooks } from '../../state/books.selectors';
import { Observable, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { BookComponent } from "../../components/book-component/book-component";
import { HelpersService } from '../../../shared/services/helpers.service';

@Component({
  selector: 'app-books',
  imports: [AsyncPipe, RouterLink, BookComponent],
  providers: [IceAndFireService, HelpersService],
  templateUrl: './books.component.html',
  standalone: true,
})
export class BooksComponent implements OnInit {
  public books$: Observable<ReadonlyArray<Book>>;
  private books: ReadonlyArray<Book> = [];

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
    private helpersService: HelpersService,
  ) {
    this.books$ = this.store.select(selectAllBooks)
      .pipe(
        tap(books => this.books = books)
      );
  }

  public ngOnInit(): void {
    this.iceAndFireService
      .getBooks()
      .subscribe(books => {
        this.store.dispatch(BooksActions.loadBookList({ books }))
      });
  }

 public getBookIndex(isbn: string): string {
    return this.helpersService.getBookIndex(isbn, this.books).toString()
  }
}
