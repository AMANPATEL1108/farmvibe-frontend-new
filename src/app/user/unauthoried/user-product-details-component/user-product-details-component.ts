import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductDetailService } from './productdetails.srevice';
import { Product } from './product';

@Component({
  selector: 'app-user-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-product-details-component.html',
})
export class UserProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;
  error: string = '';
  productId: number | null = null;

  readonly staticImageUrl =
    'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductDetailService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('🏗️ Product Details Component Constructor Called');
  }

  goToProducts() {
    this.router.navigate(['/farmvibe/products']);
  }

  ngOnInit(): void {
    console.log('🚀 ngOnInit Called for Product Details');

    // Get the product ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('📌 Route param ID:', id);

      if (id) {
        this.productId = +id; // Convert string to number
        this.loadProductDetails(this.productId);
      } else {
        this.error = 'Product ID not found in URL';
        this.isLoading = false;
      }
    });
  }

  loadProductDetails(id: number): void {
    console.log('📡 loadProductDetails() called for ID:', id);
    this.isLoading = true;
    this.error = '';

    this.productService
      .getProductById(id)
      .pipe(
        catchError((error) => {
          console.error('❌ ERROR loading product:', error);
          this.error = `Failed to load product details: ${
            error.status || 'Network Error'
          }`;
          this.isLoading = false;
          this.cdr.detectChanges();
          return of(null);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('📥 Product data received:', data);

          if (data) {
            // Override imageUrl with static image
            this.product = {
              ...data,
              imageUrl: this.staticImageUrl,
            };
            console.log('✅ Product loaded:', this.product);
          } else {
            this.error = 'Product not found';
          }

          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('❌❌ ERROR in subscribe:', err);
          this.error = 'Failed to load product. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('✔️ Product loading completed');
        },
      });
  }

  // Modal helper methods
  private get modalEl(): HTMLElement | null {
    return document.getElementById('quantityModal');
  }

  private get orderDateEl(): HTMLElement | null {
    return document.getElementById('orderDate');
  }

  private get quantityInputEl(): HTMLInputElement | null {
    return document.getElementById('quantityInput') as HTMLInputElement | null;
  }

  private get deliveryDateEl(): HTMLInputElement | null {
    return document.getElementById('deliveryDate') as HTMLInputElement | null;
  }

  private get availableStockEl(): HTMLElement | null {
    return document.getElementById('availableStockText');
  }

  openQuantityModel(): void {
    console.log('Called Open Quantity Model');
    if (this.product && this.product.stock > 0) {
      this.openModal();
    } else {
      alert('This product is currently out of stock');
    }
  }

  openModal(): void {
    const today = new Date().toISOString().split('T')[0];

    // Set order date text
    if (this.orderDateEl) this.orderDateEl.textContent = today;

    // Set min attribute for delivery date
    if (this.deliveryDateEl) this.deliveryDateEl.setAttribute('min', today);

    // Update max quantity based on product stock
    if (this.quantityInputEl && this.product) {
      this.quantityInputEl.setAttribute('max', String(this.product.stock));
      this.quantityInputEl.value = '1';
    }

    // Update available stock text
    if (this.availableStockEl && this.product) {
      this.availableStockEl.textContent = `Available Stock: ${this.product.stock}`;
    }

    // Show modal
    if (this.modalEl) {
      this.modalEl.classList.remove('hidden');
      this.modalEl.classList.add('flex');
    }
  }

  closeModal(): void {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
      this.modalEl.classList.remove('flex');
    }
  }

  changeQuantity(delta: number): void {
    const input = this.quantityInputEl;
    if (!input) return;

    const min = parseInt(input.min || '1', 10);
    const max = parseInt(input.max || String(this.product?.stock || 10), 10);
    let quantity = parseInt(input.value || '1', 10);

    quantity += delta;
    if (quantity >= min && quantity <= max) {
      input.value = String(quantity);
    }
  }

  proceed(): void {
    const quantity = this.quantityInputEl?.value;
    const deliveryDate = this.deliveryDateEl?.value;

    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    console.log('Proceeding with order:', {
      productId: this.productId,
      quantity: quantity,
      deliveryDate: deliveryDate,
    });

    // You can pass order data via router state if needed
    this.router.navigate(['/farmvibe/products/address'], {
      state: {
        productId: this.productId,
        quantity: quantity,
        deliveryDate: deliveryDate,
        product: this.product,
      },
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.staticImageUrl;
  }
}
