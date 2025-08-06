import { Injectable } from "@angular/core";
import { Book } from "../models/book.model";

@Injectable()
export class HelpersService {
    public getBookIndex(isbn: string, bookList: ReadonlyArray<Book>): number {
        return bookList.findIndex((book: Book) => book.isbn === isbn) + 1
    }
}