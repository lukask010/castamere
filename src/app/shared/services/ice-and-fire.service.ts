import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class IceAndFireService {
    private apiUrl = "https://anapioficeandfire.com/api"

    constructor(
        private httpClient: HttpClient,
    ) {}

    public getBooks() {
        return this.httpClient.get(`${this.apiUrl}/books`)
    }
}