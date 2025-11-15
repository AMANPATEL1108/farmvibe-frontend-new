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

  constructor(private http: HttpClient) {
    console.log('🔧 ProductService initialized');
  }

  getAllProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}/get-all-products`;
    console.log('🌐 Making HTTP GET request to:', url);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.get<Product[]>(url, { headers }).pipe(
      tap((response) => {
        console.log('✅ HTTP Response received:', response);
        console.log('✅ Response type:', typeof response);
        console.log('✅ Is Array:', Array.isArray(response));
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/get-product/${id}`;
    console.log('🌐 Making HTTP GET request for product:', url);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.get<Product>(url, { headers }).pipe(
      tap((response) => {
        console.log('✅ Product details received:', response);
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('❌ HTTP Error occurred:');

    if (error.error instanceof ErrorEvent) {
      console.error('  🔴 Client-side error:', error.error.message);
    } else {
      console.error('  🔴 Backend error:');
      console.error('    Status:', error.status);
      console.error('    Status Text:', error.statusText);
      console.error('    Error:', error.error);
      console.error('    Message:', error.message);
      console.error('    URL:', error.url);
    }

    return throwError(() => ({
      status: error.status,
      message: error.message,
      error: error.error,
    }));
  }
}
