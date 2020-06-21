import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}
  page = 1;
  level = 1;
  getWords() {
    return this.http.get(
      `https://afternoon-falls-25894.herokuapp.com/words?page=${
        this.page > 30 ? this.page - 31 : this.page - 1
      }&group=${this.level - 1}`
    );
  }
}
