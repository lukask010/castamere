import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../shared/models/book.model';
import { BooksActions } from '../../state/books.actions';
import { selectSelectedBook } from '../../state/books.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-books-detail',
  imports: [AsyncPipe],
  providers: [IceAndFireService],
  templateUrl: './books-detail.html',
  styleUrl: './books-detail.scss',
  standalone: true,
})
export class BooksDetail implements OnInit {
  public book$: Observable<Book | undefined>

  constructor(
    private iceAndFireService: IceAndFireService,
    private store: Store,
    private activatedRouted: ActivatedRoute,
  ) { 
    this.book$ = this.store.select(selectSelectedBook)
   }

  public ngOnInit(): void {
    this.activatedRouted.paramMap
    .subscribe((params) => {
      const bookId = params.get('id')
      if (bookId) {
        this.loadBook(+bookId)
      }
     })
  }

  private loadBook(bookId: number): void {
    this.iceAndFireService.getBook(bookId)
    .subscribe((book: Book) => {
      this.store.dispatch(BooksActions.loadBook({book}))
    })
  }
}
