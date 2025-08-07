import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../../shared/models/book.model';
import { BooksActions } from '../../state/books.actions';
import { selectFavoritesBook, selectSelectedBook } from '../../state/books.selectors';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-books-detail',
  imports: [RouterModule],
  providers: [IceAndFireService],
  templateUrl: './books-detail.component.html',
  standalone: true,
})
export class BooksDetailComponent implements OnInit, OnDestroy {

  public book: Book | undefined
  public isBookFavorite = false

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
    private activatedRouted: ActivatedRoute,
    private location: Location,
  ) { }

  public ngOnInit(): void {
    this.activatedRouted.paramMap
    .subscribe((params) => {
      const bookId = params.get('id')
      if (bookId) {
        this.loadBook(+bookId)
      }
     })

     combineLatest([
       this.store.select(selectSelectedBook),
       this.store.select(selectFavoritesBook)
     ]).subscribe(([book, favorites]) => {
        this.book = book
        this.isBookFavorite = favorites.some((favorite: Book) => favorite.isbn === this.book?.isbn)
     })
  }

  public ngOnDestroy(): void {
    this.store.dispatch(BooksActions.loadBook({ book: undefined }))
  }

  public addToFavorites(book: Book) {
    this.store.dispatch(BooksActions.addToFavorites({ book }))
  }

  public removeFromFavorites(isbn: string) {
    this.store.dispatch(BooksActions.removeFromFavorites({ isbn }))
  }

  public openLinkInNewTab(character: string) {
    window.open(character, '_blank')
  }

  public goBack() {
    this.location.back();
  }

  private loadBook(bookId: number): void {
    this.iceAndFireService.getBook(bookId)
    .subscribe((book: Book) => {
      this.store.dispatch(BooksActions.loadBook({book}))
    })
  }
}
