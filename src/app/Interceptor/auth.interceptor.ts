import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserHeaderComponentService } from '../user/unauthoried/user-header-component/user-header-component-service';
import { TokenVerificationRequest } from '../Verification-model/token-verification-request.model';
import { TokenVerificationResponse } from '../Verification-model/token-verification-response.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private verifyUrl = 'http://localhost:8080/auth/verify-token';

  constructor(
    private router: Router,
    private http: HttpClient,
    private headerService: UserHeaderComponentService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      // No token, proceed without auth
      return next.handle(req);
    }

    const payload: TokenVerificationRequest = { token };

    // Call verify-token API before sending original request
    return this.http
      .post<TokenVerificationResponse>(this.verifyUrl, payload)
      .pipe(
        switchMap((res) => {
          if (res.success) {
            // Token valid → set auth state and send request with token
            this.headerService.setAuthState(true);

            const authReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
            });

            return next.handle(authReq);
          } else {
            // Invalid token → logout
            this.headerService.logout();
            this.router.navigate(['/farmvibe/signin']);
            return throwError(() => new Error('Invalid token'));
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.headerService.logout();
          this.router.navigate(['/farmvibe/signin']);
          return throwError(() => error);
        })
      );
  }
}
