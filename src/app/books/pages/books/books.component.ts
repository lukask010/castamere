import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../../shared/services/ice-and-fire.service';

@Component({
  selector: 'app-books',
  imports: [],
  providers: [IceAndFireService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  standalone: true,
})
export class BooksComponent implements OnInit {
  constructor(
    private iceAndFireService: IceAndFireService,
  ) {}

  public ngOnInit(): void {
    console.log('hello world')
  }
}
