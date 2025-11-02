// user-profile-details-service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserProfileDetailsService {
  private baseUrl = 'http://localhost:8080/user';
  private authBaseUrl = 'http://localhost:8080/auth';
  private addressBaseUrl = 'http://localhost:8080/user/address-details';

  private authState = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private hasValidToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      return !!(token && token.split('.').length === 3);
    }
    return false;
  }

  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token && token.split('.').length === 3) {
        return token;
      }
      this.clearAuthToken();
      return null;
    }
    return null;
  }

  private clearAuthToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      this.authState.next(false);
    }
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);

    if (error.status === 401 || error.status === 403) {
      this.clearAuthToken();
      this.router.navigate(['/login']);
      return throwError(
        () => new Error('Session expired. Please login again.')
      );
    }

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return throwError(
        () => new Error('Network error. Please check your connection.')
      );
    } else {
      // Server-side error
      const serverError =
        error.error?.message || error.error?.error || 'Server error occurred';
      return throwError(() => new Error(serverError));
    }
  }

  // Auth methods
  getProfile(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/profile-details`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateProfile(userData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/update-profile-details`, userData, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Address methods
  getAddresses(): Observable<any> {
    return this.http
      .get(`${this.addressBaseUrl}/all`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  getAddressesByUserId(userId: number): Observable<any> {
    return this.http
      .get(`${this.addressBaseUrl}/user/${userId}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  createAddress(addressData: any): Observable<any> {
    return this.http
      .post(`${this.addressBaseUrl}/create`, addressData, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateAddress(addressId: number, addressData: any): Observable<any> {
    return this.http
      .put(`${this.addressBaseUrl}/update/${addressId}`, addressData, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.http
      .delete(`${this.addressBaseUrl}/delete/${addressId}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // OTP methods
  sendOtp(phoneNumber: string): Observable<any> {
    // Clean phone number for backend
    const cleanPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    const sendOtpRequest = { username: cleanPhone };

    return this.http.post(`${this.authBaseUrl}/send-otp`, sendOtpRequest).pipe(
      tap((response: any) => {
        console.log('OTP sent successfully:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('OTP sending failed:', error);

        // Even if SMS fails, the OTP might be generated (check backend logs)
        if (error.status === 500) {
          // For development, assume OTP was generated but SMS failed
          return throwError(
            () =>
              new Error(
                'OTP generated but SMS delivery failed. Check backend logs for OTP.'
              )
          );
        }

        return throwError(
          () => new Error(error.error?.message || 'Failed to send OTP')
        );
      })
    );
  }

  verifyOtp(phoneNumber: string, otp: string): Observable<any> {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const verifyOtpRequest = { username: cleanPhone, otp };

    return this.http
      .post(`${this.authBaseUrl}/verify-otp`, verifyOtpRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('OTP verification failed:', error);
          return throwError(
            () => new Error(error.error?.message || 'OTP verification failed')
          );
        })
      );
  }

  // Auth state observable
  get authState$(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
