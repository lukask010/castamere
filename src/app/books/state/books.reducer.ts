import { createReducer, on } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";
import { BooksActions } from "./books.actions";

export interface BooksState {
    books: ReadonlyArray<Book>;
    favorites: ReadonlyArray<Book>;
    selectedBook: Book | undefined;
}

export const initialState: BooksState = {
    books: [],
    selectedBook: undefined,
    favorites: [],
}

export const booksReducer = createReducer(
    initialState,
    on(BooksActions.loadBookList, (state, { books }) => ({
        ...state,
        books,
    })),
    on(BooksActions.loadBook, (state, { book }) => ({
        ...state,
        selectedBook: book,
    })),
    on(BooksActions.addToFavorites, (state, { book }) => ({
        ...state,
        favorites: [...state.favorites, book],
    })),
    on(BooksActions.removeFromFavorites, (state, { isbn }) => ({
        ...state,
        favorites: state.favorites.filter(book => book.isbn !== isbn)
    })),
)
