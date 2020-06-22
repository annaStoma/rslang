import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  url() {
    return new URL('https://api-rslang.herokuapp.com/');
  }
}
