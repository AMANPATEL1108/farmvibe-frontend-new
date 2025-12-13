// user-order-cod-confirmation-component.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  description: string;
  category_image_url: string;
}

export interface OrderRequest {
  quantity: number;
  totalPrice: number;
  orderDate: string; // Will be current date
  deliveryDate: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  orderConfirmed: boolean;
  productId: number;
  categoryId: number;
  addressId: number;
  userId: number;
}

export interface OrderResponse {
  orderId: number;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  deliveryDate: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  orderConfirmed: boolean;
  product: any;
  category: any;
  address: any;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserOrderCodConfirmationService {
  private baseUrl = 'http://localhost:8080/public/api/categories';
  private orderBaseUrl = 'http://localhost:8080/user/api/orders';

  constructor(private http: HttpClient) {}

  getProductCategory(productId: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.baseUrl}/get-product-category/${productId}`
    );
  }

  // New method to create order
  createOrder(orderData: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.orderBaseUrl}`, orderData);
  }
}
