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

  private initialCheckComplete = new BehaviorSubject<boolean>(false);
  initialCheckComplete$ = this.initialCheckComplete.asObservable();

  private isVerifying = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
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

    this.http.post<TokenVerificationResponse>(this.apiUrl, payload).subscribe({
      next: (res) => {
        this.isVerifying = false;
        if (res.success) {
          this.setAuthState(true);
        } else {
          // Only logout if token is explicitly invalid
          console.warn('Token verification failed:', res.message);
          this.logout();
        }
        this.initialCheckComplete.next(true);
      },
      error: (error) => {
        this.isVerifying = false;
        console.error('Token verification error:', error);

        // Don't logout on network errors, only on explicit 401 responses
        // Keep the token but mark as not authenticated temporarily
        this.setAuthState(false);
        this.initialCheckComplete.next(true);
      },
    });
  }

  // Add this method to manually set authentication after successful login
  setAuthentication(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
    this.setAuthState(true);
    this.initialCheckComplete.next(true);
  }

  // Add this method to check if initial check is complete
  isInitialCheckComplete(): boolean {
    return this.initialCheckComplete.getValue();
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

  // Helper method to get current auth state
  getAuthState(): boolean {
    return this.authState.getValue();
  }
}
