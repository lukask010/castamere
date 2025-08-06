import { createActionGroup, props } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";

export const BooksActions = createActionGroup({
    source: 'Books',
    events: {
        'Load Book List': props<{ books: ReadonlyArray<Book> }>(),
        'Load Book': props<{ book: Book | undefined }>(),
        'Load Favorites': props<{ books: ReadonlyArray<Book> }>(),
        'Add To Favorites': props<{ book: Book }>(),
        'Remove From Favorites': props<{ isbn: string }>(),
    }
})
