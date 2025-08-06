import { createReducer, on } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";
import { BooksActions } from "./books.actions";

export interface BooksState {
    books: ReadonlyArray<Book>;
    selectedBook: Book | undefined;
}

export const initialState: BooksState = {
    books: [],
    selectedBook: undefined,
}

export const booksReducer = createReducer(
    initialState,
    on(BooksActions.loadBookList, (state, { books }) => ({
        ...state,
        books,
        loading: false
    })),
    on(BooksActions.loadBook, (state, { book }) => ({
        ...state,
        selectedBook: book,
        loading: false
    })),
);
