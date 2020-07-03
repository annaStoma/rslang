import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) { }
  page = 1;
  level = 1;
  getWords() {
    return this.http.get(
      `https://api-rslang.herokuapp.com/words?page=${
      Math.floor((this.page - 1) / 2)
      }&group=${this.level - 1}`
    );
  }

  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzk5M2RmNGNhOWQ2MDAxNzg3NDBhZSIsImlhdCI6MTU5MDI2OTE1OCwiZXhwIjoxNTkwMjgzNTU4fQ.XHKmdY_jk1R7PUbgCZfqH8TxH6XQ0USwPBSKNHMdF6I';

  setUserStatistic = async (learningWords = [], hardWords = []) => {
    let response = await fetch(`https://api-rslang.herokuapp.com/users/${localStorage.getItem("userId")}/user-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    let updateData = await response.json();

    updateData.learningWords = learningWords;
    updateData.hardWords = hardWords;

    response = await fetch(`https://api-rslang.herokuapp.com/users/${localStorage.getItem("userId")}/user-data`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
  };
}
