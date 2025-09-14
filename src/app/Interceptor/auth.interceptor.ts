import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserHeaderComponentService } from '../user/unauthoried/user-header-component/user-header-component-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private headerService: UserHeaderComponentService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip token verification requests to avoid infinite loops
    if (req.url.includes('/auth/verify-token')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('authToken');

    if (!token) {
      return next.handle(req);
    }

    // Add token to request
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token is invalid or expired
          this.headerService.logout();
          this.router.navigate(['/farmvibe/signin']);
        }
        return throwError(() => error);
      })
    );
  }
}
