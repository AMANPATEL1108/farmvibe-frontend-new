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
export class ProductService {
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
      retry(1), // Retry once if it fails
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('❌ HTTP Error occurred:');

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('  🔴 Client-side error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error('  🔴 Backend error:');
      console.error('    Status:', error.status);
      console.error('    Status Text:', error.statusText);
      console.error('    Error:', error.error);
      console.error('    Message:', error.message);
      console.error('    URL:', error.url);
    }

    // Return an observable with a user-facing error message
    return throwError(() => ({
      status: error.status,
      message: error.message,
      error: error.error,
    }));
  }
}
