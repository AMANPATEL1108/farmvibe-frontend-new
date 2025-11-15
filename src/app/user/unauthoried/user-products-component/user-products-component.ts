import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-products-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-products-component.html',
  styleUrl: './user-products-component.css',
})
export class UserProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string = '';

  // Static tomato image URL for all products
  readonly staticImageUrl =
    'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg';

  constructor(
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('🏗️ Component Constructor Called');
  }

  ngOnInit() {
    console.log('🚀 ngOnInit Called');
    this.loadProducts();
  }

  loadProducts() {
    console.log('📡 loadProducts() called - Starting API call');
    this.isLoading = true;
    this.error = '';
    this.products = []; // Clear previous products

    this.productService
      .getAllProducts()
      .pipe(
        tap((data) => {
          console.log('✅ Data received in pipe:', data);
          console.log('📊 Data length:', data?.length);
          console.log('🔍 First item:', data?.[0]);
        }),
        catchError((error) => {
          console.error('❌ ERROR in pipe:', error);
          console.error('❌ Error status:', error.status);
          console.error('❌ Error message:', error.message);
          console.error(
            '❌ Full error object:',
            JSON.stringify(error, null, 2)
          );

          this.error = `Failed to load products: ${
            error.status || 'Network Error'
          }`;
          this.isLoading = false;
          this.products = [];
          this.cdr.detectChanges();

          // Return empty array to prevent subscription error
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('📥 NEXT callback - data:', data);

          if (!data || data.length === 0) {
            console.warn('⚠️ No data received or empty array');
            this.error = '';
            this.isLoading = false;
            this.products = [];
            this.cdr.detectChanges();
            return;
          }

          // Map the data and override imageUrl
          this.products = data.map((product) => ({
            ...product,
            imageUrl: this.staticImageUrl,
          }));

          this.isLoading = false;
          this.error = '';

          console.log('✅ Products set successfully:');
          console.log('  📦 products array:', this.products);
          console.log('  🔢 products.length:', this.products.length);
          console.log('  ⏳ isLoading:', this.isLoading);
          console.log('  ❗ error:', this.error);

          // Force change detection
          this.cdr.detectChanges();
          console.log('🔄 Change detection triggered');
        },
        error: (err) => {
          // This should not be called if catchError works
          console.error('❌❌ ERROR in subscribe (should not happen):', err);
          this.error = 'Failed to load products. Please try again.';
          this.isLoading = false;
          this.products = [];
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('✔️ Observable completed');
          console.log('  Final state - isLoading:', this.isLoading);
          console.log('  Final state - products.length:', this.products.length);
          console.log('  Final state - error:', this.error);
        },
      });
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.staticImageUrl;
  }

  goToProductDetailsPage(productId: number) {
    this.router.navigate(['/farmvibe/products/product-details', productId]);
  }

  // Helper method to track items in ngFor for better performance
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
