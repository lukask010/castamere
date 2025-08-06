import { createActionGroup, props } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";

export const BooksActions = createActionGroup({
    source: 'Books',
    events: {
        'Load Book List': props<{ books: ReadonlyArray<Book> }>(),
        'Load Book': props<{ book: Book }>(),
    }
})
