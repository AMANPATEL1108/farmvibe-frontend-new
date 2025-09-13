import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private verifyUrl = 'http://localhost:8080/auth/verify-token'; // replace with your API endpoint

  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<any> {
    return this.http.post(this.verifyUrl, { token });
  }
}
