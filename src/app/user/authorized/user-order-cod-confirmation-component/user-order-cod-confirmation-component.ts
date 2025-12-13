// user-order-cod-confirmation-component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserAddressDetailService,
  Address,
} from '../user-address-detail-component/user-address-detail-service';
import {
  UserOrderCodConfirmationService,
  Category,
  OrderRequest,
} from './user-order-cod-confirmation-component.service';

@Component({
  selector: 'app-user-order-cod-confirmation-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-order-cod-confirmation-component.html',
  styleUrl: './user-order-cod-confirmation-component.css',
})
export class UserOrderCodConfirmationComponent implements OnInit {
  address: Address | null = null;
  product: any = null;
  category: Category | null = null;
  qty = 1;
  total = 0;
  orderDate: string = '';
  deliveryDate: string = '';

  // Get userId from localStorage
  userId: number = parseInt(localStorage.getItem('userId') || '0');

  showConfirmPopup = false;
  showSuccessPopup = false;
  isLoadingCategory = false;
  isCreatingOrder = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private addressService: UserAddressDetailService,
    private orderService: UserOrderCodConfirmationService
  ) {
    const nav = this.router.getCurrentNavigation();
    const data = nav?.extras?.state;

    console.log('Data', data);
    if (data) {
      this.product = data['product'];
      this.qty = data['quantity'] || 1;
      this.total = data['total'] || 0;
      this.deliveryDate = data['deliveryDate'] || '';
      this.orderDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Check if address object is passed directly
      if (data['address']) {
        this.address = data['address'];
      }
      // Otherwise, load by addressId
      else if (data['addressId']) {
        this.loadAddress(data['addressId']);
      }
    }
  }

  ngOnInit(): void {
    // Load category when component initializes
    if (this.product && this.product.id) {
      this.loadProductCategory(this.product.id);
    }
  }

  loadProductCategory(productId: number) {
    this.isLoadingCategory = true;

    this.orderService.getProductCategory(productId).subscribe({
      next: (category) => {
        this.category = category;
        this.isLoadingCategory = false;
        console.log('Category loaded:', category);
      },
      error: (err) => {
        console.error('Error fetching category:', err);
        this.category = {
          id: 0,
          name: 'N/A',
          description: '',
          category_image_url: '',
        };
        this.isLoadingCategory = false;
      },
    });
  }

  loadAddress(addressId: number) {
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        const selected = addresses.find(
          (addr) => addr.address_id === addressId
        );
        if (selected) {
          this.address = selected;
        } else {
          console.error('Address not found');
        }
      },
      error: (err) => console.error('Error fetching address:', err),
    });
  }

  openConfirmPopup() {
    this.showConfirmPopup = true;
  }

  hideConfirmPopup() {
    this.showConfirmPopup = false;
  }

  placeOrder() {
    // Hide confirm popup
    this.showConfirmPopup = false;

    // Validate data
    if (!this.validateOrderData()) {
      return;
    }

    this.isCreatingOrder = true;
    this.errorMessage = '';

    // Prepare order data
    const orderData: OrderRequest = {
      quantity: this.qty,
      totalPrice: this.total,
      orderDate: this.orderDate,
      deliveryDate: this.deliveryDate,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      deliveryStatus: 'Pending',
      orderConfirmed: true,
      productId: this.product.id,
      categoryId: this.category?.id || 0,
      addressId: this.address?.address_id || 0,
      userId: this.userId,
    };

    console.log('Creating order with data:', orderData);

    // Call API to create order
    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        this.isCreatingOrder = false;
        this.showSuccessPopup = true;

        // Redirect after 2 seconds
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/farmvibe/home']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating order:', err);
        this.isCreatingOrder = false;
        this.errorMessage = 'Failed to create order. Please try again.';

        // You can show an error popup here
        alert(
          'Order creation failed: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  private validateOrderData(): boolean {
    if (!this.userId) {
      this.errorMessage = 'User not logged in. Please login first.';
      return false;
    }

    if (!this.product || !this.product.id) {
      this.errorMessage = 'Product information is missing.';
      return false;
    }

    if (!this.address || !this.address.address_id) {
      this.errorMessage = 'Address information is missing.';
      return false;
    }

    if (!this.category || !this.category.id) {
      this.errorMessage = 'Category information is missing.';
      return false;
    }

    if (!this.deliveryDate) {
      this.errorMessage = 'Delivery date is required.';
      return false;
    }

    return true;
  }
}
