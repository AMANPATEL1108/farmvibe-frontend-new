import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { TokenVerificationRequest } from '../../../Verification-model/token-verification-request.model';
import { TokenVerificationResponse } from '../../../Verification-model/token-verification-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserHeaderComponentService {
  private apiUrl = 'http://localhost:8080/auth/verify-token';

  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  private initialCheckComplete = new BehaviorSubject<boolean>(false);
  initialCheckComplete$ = this.initialCheckComplete.asObservable();

  private isVerifying = false;

  private httpBypass: HttpClient; // HttpClient without interceptors

  constructor(
    handler: HttpBackend, // Inject HttpBackend instead of HttpClient
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.httpBypass = new HttpClient(handler); // Create HttpClient that skips interceptors
    this.checkTokenOnStart();
  }

  /** Only run localStorage code if in browser */
  checkTokenOnStart() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.verifyToken(token);
      } else {
        this.setAuthState(false);
        this.initialCheckComplete.next(true);
      }
    } else {
      this.initialCheckComplete.next(true);
    }
  }

  verifyToken(token: string) {
    if (this.isVerifying) return;

    this.isVerifying = true;
    const payload: TokenVerificationRequest = { token };

    // Use httpBypass so interceptors are skipped here
    this.httpBypass
      .post<TokenVerificationResponse>(this.apiUrl, payload)
      .subscribe({
        next: (res) => {
          this.isVerifying = false;
          if (res.success) {
            this.setAuthState(true);
          } else {
            console.warn('Token verification failed:', res.message);
            this.logout();
          }
          this.initialCheckComplete.next(true);
        },
        error: (error) => {
          this.isVerifying = false;
          console.error('Token verification error:', error);
          this.setAuthState(false);
          this.initialCheckComplete.next(true);
        },
      });
  }

  setAuthentication(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
    this.setAuthState(true);
    this.initialCheckComplete.next(true);
  }

  isInitialCheckComplete(): boolean {
    return this.initialCheckComplete.getValue();
  }

  setAuthState(isAuthenticated: boolean) {
    this.authState.next(isAuthenticated);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
    }

    this.setAuthState(false);
  }

  getAuthState(): boolean {
    return this.authState.getValue();
  }
}
