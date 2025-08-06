import { Component, OnInit } from '@angular/core';
import { BookComponent } from "../../components/book-component/book-component";
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { selectFavoritesBook } from '../../state/books.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [BookComponent, RouterModule, AsyncPipe],
  templateUrl: './favorites.html',
  standalone: true,
})
export class Favorites {
  public books$: Observable<ReadonlyArray<Book>>;

  constructor(
    private store: Store,
  ) {
    this.books$ = this.store.select(selectFavoritesBook)
  }
}
