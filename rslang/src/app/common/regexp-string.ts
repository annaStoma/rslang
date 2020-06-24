import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegExpString {
  email(): RegExp {
    return /^(?:[a-z0-9_\.\-])+\@(?:(?:[a-z0-9\-])+\.)+(?:[a-z0-9]{2,4})+$/i;
  }

  password(): RegExp {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\+\-_@$!%*?&#\.,;\:\[\]\{\}])[A-Za-z\d\+\-_@$!%*?&#\.,;\:\[\]\{\}]{8,}$/;
  }
}
