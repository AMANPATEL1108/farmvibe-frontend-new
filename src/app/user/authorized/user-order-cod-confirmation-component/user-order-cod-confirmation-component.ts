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

  showConfirmPopup = false;
  showSuccessPopup = false;
  isLoadingCategory = false;

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
      this.orderDate = new Date().toLocaleString();

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
    this.showConfirmPopup = false;
    this.showSuccessPopup = true;

    setTimeout(() => {
      this.showSuccessPopup = false;
      this.router.navigate(['/farmvibe/home']);
    }, 2000);
  }
}
