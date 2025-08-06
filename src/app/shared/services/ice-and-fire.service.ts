import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../models/book.model";

@Injectable()
export class IceAndFireService {
    private apiUrl = "https://anapioficeandfire.com/api"

    constructor(
        private httpClient: HttpClient,
    ) {}

    public getBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${this.apiUrl}/books?pageSize=20`)
    }

    public getBook(bookId: number): Observable<Book> {
        return this.httpClient.get<Book>(`${this.apiUrl}/books/${bookId}`)
    }
}
