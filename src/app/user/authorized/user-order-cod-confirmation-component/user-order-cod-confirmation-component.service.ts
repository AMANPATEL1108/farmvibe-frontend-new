import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  description: string;
  category_image_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserOrderCodConfirmationService {
  private baseUrl = 'http://localhost:8080/public/api/categories';

  constructor(private http: HttpClient) {}

  getProductCategory(productId: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.baseUrl}/get-product-category/${productId}`
    );
  }
}
