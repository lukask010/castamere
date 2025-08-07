import { Routes } from '@angular/router';
import { HomeComponent } from './home/home-component/home-comonent';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'books',
        loadComponent: () => import('./books/pages/books/books.component').then(m => m.BooksComponent)
    },
    {
        path: 'books/:id',
        loadComponent: () => import('./books/pages/books-detail/books-detail.component').then(m => m.BooksDetailComponent)
    },
    {
        path: 'favorites',
        loadComponent: () => import('./books/pages/favorites/favorites.component').then(m => m.FavoritesComponent)
    },
    {
        path: 'favorites/:id',
        loadComponent: () => import('./books/pages/books-detail/books-detail.component').then(m => m.BooksDetailComponent)
    },
];
