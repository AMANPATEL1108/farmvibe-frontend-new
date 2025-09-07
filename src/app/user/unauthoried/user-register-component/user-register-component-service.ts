import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { RegisterDTO } from './RegisterDTO';

export interface SendOtpRequest {
  username: string;
}

export interface OtpVerificationRequest {
  username: string;
  otp: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserRegisterComponentService {
  BASE_URL = 'http://localhost:8080/auth';
  TIMEOUT_DURATION = 10000;

  constructor(private http: HttpClient) {}

  // Send OTP to phone number
  sendOtp(phone: string): Observable<any> {
    const requestBody: SendOtpRequest = {
      username: phone,
    };
    console.log('REq body', requestBody);

    return this.http
      .post(`${this.BASE_URL}/send-otp`, requestBody, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        timeout(this.TIMEOUT_DURATION), // Add timeout
        catchError(this.handleError)
      );
  }

  // Verify OTP
  verifyOtp(phone: string, otp: string): Observable<any> {
    const requestBody: OtpVerificationRequest = {
      username: phone,
      otp: otp,
    };

    return this.http
      .post(`${this.BASE_URL}/verify-otp`, requestBody, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        timeout(this.TIMEOUT_DURATION), // Add timeout
        catchError(this.handleError)
      );
  }

  // Register user
  registerUser(userData: RegisterDTO): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/register`, userData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        timeout(this.TIMEOUT_DURATION), // Add timeout
        catchError(this.handleError)
      );
  }

  // Improved Error handling
  private handleError(error: any) {
    console.error('Error details:', error);

    let errorMessage = 'Unknown error occurred';

    if (error.name === 'TimeoutError') {
      errorMessage =
        'Request timeout. Please check your internet connection and try again.';
    } else if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage =
        'Cannot connect to server. Please check if backend is running.';
    } else if (error.status === 403) {
      errorMessage = 'Access forbidden. Please check your API configuration.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (error.status) {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(errorMessage);
  }
}
