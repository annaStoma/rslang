import { EventEmitter, Injectable } from '@angular/core';

import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserBlockService {
  private user: User = null;

  updateUser: EventEmitter<User> = new EventEmitter<User>();

  public setUser(user: User) {
    this.updateUser.emit(user);
  }
}
