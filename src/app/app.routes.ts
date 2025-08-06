import { Routes } from '@angular/router';
import { BooksComponent } from './books/pages/books/books.component';

export const routes: Routes = [
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'books/:id',
        loadComponent: () => import('./books/pages/books-detail/books-detail').then(m => m.BooksDetail)
    },
];
