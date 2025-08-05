import { createFeatureSelector } from "@ngrx/store";
import { Book } from "../../shared/models/book.model";

export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');
