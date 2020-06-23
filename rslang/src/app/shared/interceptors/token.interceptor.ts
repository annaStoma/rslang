import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { UserBlockService } from '../services/user-block.service';

enum Error {
  TOKEN_EXPIRED = 401,
  FORBIDDEN = 403,
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private localData: LocalstorageService,
    private userBlockService: UserBlockService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
        },
      });
    }
    return next
      .handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<never> {
    if (err.status === Error.FORBIDDEN || err.status === Error.TOKEN_EXPIRED) {
      this.auth.setToken(null);
      this.localData.clearAuthData();
      this.userBlockService.setUser(null);
      this.localData.deleteUser();
      const queryParam =
        err.status === Error.TOKEN_EXPIRED ? 'sessionFailed' : 'accessDenied';
      const queryParams = {};
      queryParams[queryParam] = true;
      this.router.navigate(['/login'], {
        queryParams,
      });
    }
    return throwError(err);
  }
}
