import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../shared/models/book.model';
import { BooksActions } from '../../state/books.actions';
import { selectFavoritesBook, selectSelectedBook } from '../../state/books.selectors';

@Component({
  selector: 'app-books-detail',
  imports: [],
  providers: [IceAndFireService],
  templateUrl: './books-detail.html',
  styleUrl: './books-detail.scss',
  standalone: true,
})
export class BooksDetail implements OnInit {

  public book: Book | undefined
  public isBookFavorite = false

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
    private activatedRouted: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.activatedRouted.paramMap
    .subscribe((params) => {
      const bookId = params.get('id')
      if (bookId) {
        this.loadBook(+bookId)
      }
     })

    this.store.select(selectSelectedBook)
     .subscribe((book: Book | undefined) => {
      this.book = book
     })

    this.store.select(selectFavoritesBook)
      .subscribe((favorites: ReadonlyArray<Book>) => {
        this.isBookFavorite = favorites.some((favorite: Book) => favorite.isbn === this.book?.isbn)
      })
  }

  public addToFavorites(book: Book) {
    this.store.dispatch(BooksActions.addToFavorites({ book }))
  }

  public removeFromFavorites(isbn: string) {
    this.store.dispatch(BooksActions.removeFromFavorites({ isbn }))
  }

  private loadBook(bookId: number): void {
    this.iceAndFireService.getBook(bookId)
    .subscribe((book: Book) => {
      this.store.dispatch(BooksActions.loadBook({book}))
    })
  }
}
