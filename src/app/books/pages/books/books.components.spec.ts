import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { HelpersService } from '../../../shared/services/helpers.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { AsyncPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('BooksComponent', () => {
    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;
    let mockIceAndFireService: jasmine.SpyObj<IceAndFireService>;
    let mockStore: jasmine.SpyObj<Store>;
    let mockHelpersService: jasmine.SpyObj<HelpersService>;

    const mockBooks: Book[] = [
        { name: 'A Game of Thrones', isbn: '978-0553103540', authors: ['George R. R. Martin'] } as Book,
        { name: 'The Hobbit', isbn: '978-0547928227', authors: ['J.R.R. Tolkien'] } as Book,
        { name: 'A Clash of Kings', isbn: '978-0553108033', authors: ['George R. R. Martin'] } as Book
    ];

    beforeEach(async () => {
        const iceAndFireServiceSpy = jasmine.createSpyObj('IceAndFireService', ['getBooks']);
        const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        const helpersServiceSpy = jasmine.createSpyObj('HelpersService', ['getBookIndex']);

        // Configure store spy to return observable
        storeSpy.select.and.returnValue(of(mockBooks));

        await TestBed.configureTestingModule({
            imports: [BooksComponent, ReactiveFormsModule],
            providers: [
                provideHttpClient(),
                provideRouter([]),
                FormBuilder,
                AsyncPipe,
                { provide: IceAndFireService, useValue: iceAndFireServiceSpy },
                { provide: Store, useValue: storeSpy },
                { provide: HelpersService, useValue: helpersServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BooksComponent);
        component = fixture.componentInstance;
        mockIceAndFireService = TestBed.inject(IceAndFireService) as jasmine.SpyObj<IceAndFireService>;
        mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        mockHelpersService = TestBed.inject(HelpersService) as jasmine.SpyObj<HelpersService>;

        mockStore.select.and.returnValue(of(mockBooks));
        mockIceAndFireService.getBooks.and.returnValue(of(mockBooks));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize search form with empty search term', () => {
        expect(component.searchForm.get('searchTerm')?.value).toBe('');
    });

    describe('search feature', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should filter books by name', fakeAsync(() => {
            let result: ReadonlyArray<Book> = [];

            component.filteredBooks$.subscribe(books => {
                result = books;
            });

            component.searchForm.get('searchTerm')?.setValue('Hobbit');
            tick();

            expect(result.length).toBe(1);
            expect(result[0].name).toBe('The Hobbit');
        }));

        it('should filter books case insensitively', fakeAsync(() => {
            let result: ReadonlyArray<Book> = [];

            component.filteredBooks$.subscribe(books => {
                result = books;
            });

            component.searchForm.get('searchTerm')?.setValue('game');
            tick();

            expect(result.length).toBe(1);
            expect(result[0].name).toBe('A Game of Thrones');
        }));

        it('should return all books when search term is empty', fakeAsync(() => {
            let result: ReadonlyArray<Book> = [];

            component.filteredBooks$.subscribe(books => {
                result = books;
            });

            component.searchForm.get('searchTerm')?.setValue('');
            tick();

            expect(result.length).toBe(3);
        }));

        it('should return multiple books for partial matches', fakeAsync(() => {
            let result: ReadonlyArray<Book> = [];

            component.filteredBooks$.subscribe(books => {
                result = books;
            });

            component.searchForm.get('searchTerm')?.setValue('A ');
            tick();

            expect(result.length).toBe(2);
            expect(result.map(b => b.name)).toContain('A Game of Thrones');
            expect(result.map(b => b.name)).toContain('A Clash of Kings');
        }));

        it('should return empty array for non-matching search term', fakeAsync(() => {
            let result: ReadonlyArray<Book> = [];

            component.filteredBooks$.subscribe(books => {
                result = books;
            });

            component.searchForm.get('searchTerm')?.setValue('Non-existent Book');
            tick();

            expect(result.length).toBe(0);
        }));
    });
});
