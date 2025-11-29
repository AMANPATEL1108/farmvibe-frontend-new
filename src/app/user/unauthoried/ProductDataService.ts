import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private productId: number | null = null;

  setProductId(id: number) {
    this.productId = id;
  }

  getProductId(): number | null {
    return this.productId;
  }

  clearProductId() {
    this.productId = null;
  }
}
