import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  url(): URL {
    return new URL('https://api-rslang.herokuapp.com/');
  }

  dataUrl(): string {
    return 'https://nexgenua.github.io/rslang-data/';
  }
}
