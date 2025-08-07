import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../shared/models/book.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-component',
  imports: [DatePipe],
  templateUrl: './book-component.html',
  standalone: true,
})
export class BookComponent {
  @Input() public book: Book | undefined
}
