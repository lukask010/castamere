import { Routes } from '@angular/router';
import { BooksComponent } from './books/pages/books/books.component';
import { App } from './app';
import { HomeComonent } from './home/home-comonent/home-comonent';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComonent,
    },
    {
        path: 'books',
        loadComponent: () => import('./books/pages/books/books.component').then(m => m.BooksComponent)
    },
    {
        path: 'books/:id',
        loadComponent: () => import('./books/pages/books-detail/books-detail').then(m => m.BooksDetailComponent)
    },
];
