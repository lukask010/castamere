import { createReducer, on } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";
import { BooksActions } from "./books.actions";

export const initalState: ReadonlyArray<Book> = []

export const booksReducer = createReducer(
    initalState,
    on(BooksActions.retrievedBookList, (_state, {books}) => books)
)
