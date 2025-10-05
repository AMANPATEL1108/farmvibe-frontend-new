// user-profile-details-service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserProfileDetailsService {
  private baseUrl = 'http://localhost:8080/user';
  private authBaseUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getProfile(): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.baseUrl}/profile-details`, { headers });
  }

  updateProfile(userData: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.baseUrl}/update-profile-details`, userData, {
      headers,
    });
  }

  sendOtp(username: string): Observable<any> {
    const sendOtpRequest = { username };
    return this.http.post(`${this.authBaseUrl}/send-otp`, sendOtpRequest);
  }

  verifyOtp(username: string, otp: string): Observable<any> {
    const verifyOtpRequest = { username, otp };
    return this.http.post(`${this.authBaseUrl}/verify-otp`, verifyOtpRequest);
  }
}
