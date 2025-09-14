import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './LoginResponse';
import { LoginRequest } from './LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class UserSigninComponentService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(loginData: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginData, {
      headers,
    });
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  // Method to get stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Method to logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
