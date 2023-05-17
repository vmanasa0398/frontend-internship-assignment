import { Component } from '@angular/core';
import { Book } from './shared/models/book-response.model';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchText: string = '';
  booksList: Book[] = [];
  loading: boolean = false;
  error: string = '';
  page: number = 1;
  limit: number = 10;

  constructor(private apiService: ApiService) {}

  searchBooks() {
    if (this.searchText.trim() !== '') {
      this.loading = true;
      this.error = '';

      this.apiService.searchBooks(this.searchText, this.page, this.limit).subscribe(
        (response) => {
          this.booksList = response.docs;
          this.loading = false;
        },
        (error) => {
          this.error = 'An error occurred while fetching the search results.';
          this.loading = false;
        }
      );
    }
  }

  clearSearch() {
    this.searchText = '';
    this.booksList = [];
    this.page = 1;
  }

  previousPage() {
    this.page--;
    this.searchBooks();
  }

  nextPage() {
    this.page++;
    this.searchBooks();
  }
}
