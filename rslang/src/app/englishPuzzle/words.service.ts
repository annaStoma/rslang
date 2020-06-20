import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}
  page = 29;
  level = 1;
  getWords() {
    return this.http.get(
      `https://afternoon-falls-25894.herokuapp.com/words?page=${this.page}&group=${this.level}`
    );
  }
}
