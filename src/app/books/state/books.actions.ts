import { createAction, createActionGroup, props } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";

export const BooksActions = createActionGroup({
    source: 'Books',
    events: {
        'Retrieved Book List': props<{ books: ReadonlyArray<Book> }>(),
    }
})
