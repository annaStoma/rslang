import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userId: string;
  userToken: string;
  userName: string;

  constructor() {}

  set setUserId(id) {
    this.userId = id;
  }
  get getUserId(): string {
    return this.userId;
  }

  set setUserToken(token) {
    this.userToken = token;
  }
  get getUserToken(): string {
    return this.userToken;
  }

  set setUserName(name) {
    this.userName = name;
  }
  get getUserName(): string {
    return this.userName;
  }
}
