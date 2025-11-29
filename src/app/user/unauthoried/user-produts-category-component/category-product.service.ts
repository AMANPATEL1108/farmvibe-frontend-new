import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  weight: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserCategoryProductService {
  private apiBaseUrl = 'http://localhost:8080/public/api/categories';

  constructor(private http: HttpClient) {}

  // Get products by category ID
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiBaseUrl}/get-category-by-id/${categoryId}`
    );
  }
}
