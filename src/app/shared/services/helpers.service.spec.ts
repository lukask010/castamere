import {HelpersService} from './helpers.service';
import {Book} from '../models/book.model';

describe('HelpersService', () => {
  const helpersService = new HelpersService();

  it('should find correct index', () => {
    const booksArray: ReadonlyArray<Partial<Book>> = [
      { isbn: '111', name: 'Book One' },
      { isbn: '222', name: 'Book Two' },
      { isbn: '333', name: 'Book Three' }
    ];
    const index = helpersService.getBookIndex('222', booksArray as ReadonlyArray<Book>);
    expect(index).toBe(2); // 1-based index
  });

  it('should return 0 if ISBN not found', () => {
    const booksArray: ReadonlyArray<Partial<Book>>  = [
      { isbn: '111', name: 'Book One' }
    ];
    const index = helpersService.getBookIndex('999', booksArray as ReadonlyArray<Book>);
    expect(index).toBe(0);
  });
})
