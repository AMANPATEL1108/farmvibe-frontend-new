import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private baseUrl = 'http://localhost:8080/public/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}/get-all-products`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.get<Product[]>(url, { headers }).pipe(
      tap(() => {}),
      retry(1),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/get-product/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.get<Product>(url, { headers }).pipe(
      tap(() => {}),
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => ({
      status: error.status,
      message: error.message,
      error: error.error,
    }));
  }
}
