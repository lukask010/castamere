import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { BooksActions } from '../../state/books.actions';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectAllBooks } from '../../state/books.selectors';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { BookComponent } from "../../components/book-component/book-component";
import { HelpersService } from '../../../shared/services/helpers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  imports: [AsyncPipe, RouterLink, BookComponent, ReactiveFormsModule],
  providers: [IceAndFireService, HelpersService],
  templateUrl: './books.component.html',
  standalone: true,
})
export class BooksComponent implements OnInit {
  public books$: Observable<ReadonlyArray<Book>>;
  public filteredBooks$: Observable<ReadonlyArray<Book>>
  public searchForm: FormGroup;

  private books: ReadonlyArray<Book> = [];

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
    private helpersService: HelpersService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    })

    this.books$ = this.store.select(selectAllBooks)
      .pipe(
        tap(books => this.books = books)
      );

    this.filteredBooks$ = combineLatest([
      this.books$,
      this.searchForm.get('searchTerm')!.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([books, searchTerm]) => {
        const filtered = books.filter(book =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return filtered
      })
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
