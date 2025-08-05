import { Routes } from '@angular/router';
import { BooksComponent } from './books/pages/books/books.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'books',
        component: BooksComponent
    },

];
