import { Component, OnInit } from '@angular/core';
import { BookComponent } from "../../components/book-component/book-component";
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { selectAllBooks, selectFavoritesBook } from '../../state/books.selectors';
import { AsyncPipe } from '@angular/common';
import { HelpersService } from '../../../shared/services/helpers.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterModule, AsyncPipe, BookComponent],
  providers: [HelpersService],
  templateUrl: './favorites.component.html',
  standalone: true,
})
export class FavoritesComponent {
  public books$: Observable<ReadonlyArray<Book>>;
  private books: ReadonlyArray<Book> = [];

  constructor(
    private store: Store,
    private helpersService: HelpersService,
  ) {
    this.books$ = this.store.select(selectFavoritesBook)
    
    this.store.select(selectAllBooks)
    .subscribe((books) => this.books = books)
  }

  public getBookIndex(isbn: string): string {
    return this.helpersService.getBookIndex(isbn, this.books).toString()
  }
}
