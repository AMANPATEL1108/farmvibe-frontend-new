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

  readonly staticImageUrl =
    'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg';

  constructor(
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = '';
    this.products = [];

    this.productService
      .getAllProducts()
      .pipe(
        tap(() => {}),
        catchError((error) => {
          this.error = `Failed to load products: ${
            error.status || 'Network Error'
          }`;
          this.isLoading = false;
          this.products = [];
          this.cdr.detectChanges();
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          if (!data || data.length === 0) {
            this.error = '';
            this.isLoading = false;
            this.products = [];
            this.cdr.detectChanges();
            return;
          }

          this.products = data.map((product) => ({
            ...product,
            imageUrl: this.staticImageUrl,
          }));

          this.isLoading = false;
          this.error = '';
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Failed to load products. Please try again.';
          this.isLoading = false;
          this.products = [];
          this.cdr.detectChanges();
        },
        complete: () => {},
      });
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.staticImageUrl;
  }

  goToProductDetailsPage(productId: number) {
    this.router.navigate(['/farmvibe/products/product-details'], {
      state: { id: productId },
    });
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
