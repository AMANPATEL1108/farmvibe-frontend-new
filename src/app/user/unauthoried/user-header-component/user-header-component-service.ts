import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenVerificationRequest } from '../../../Verification-model/token-verification-request.model';
import { TokenVerificationResponse } from '../../../Verification-model/token-verification-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserHeaderComponentService {
  private apiUrl = 'http://localhost:8080/auth/verify-token';

  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkTokenOnStart();
  }

  /** Only run localStorage code if in browser */
  private checkTokenOnStart() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.verifyToken(token);
      }
    }
  }

  verifyToken(token: string) {
    const payload: TokenVerificationRequest = { token };

    this.http.post<TokenVerificationResponse>(this.apiUrl, payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.setAuthState(true);
        } else {
          this.logout();
        }
      },
      error: () => {
        this.logout();
      },
    });
  }

  setAuthState(isAuthenticated: boolean) {
    this.authState.next(isAuthenticated);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
    this.setAuthState(false);
  }
}
