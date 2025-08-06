import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";
import { BooksState } from "./books.reducer";

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
    selectBooksState,
    (state: BooksState) => state.books
);

export const selectSelectedBook = createSelector(
    selectBooksState,
    (state: BooksState) => state.selectedBook
);

