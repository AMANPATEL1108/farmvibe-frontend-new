import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserAddressDetailService,
  Address,
} from '../user-address-detail-component/user-address-detail-service';

@Component({
  selector: 'app-user-order-cod-confirmation-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-order-cod-confirmation-component.html',
  styleUrl: './user-order-cod-confirmation-component.css',
})
export class UserOrderCodConfirmationComponent {
  address: Address | null = null;
  product: any = null;
  category: any = null;
  qty = 1;
  total = 0;
  orderDate: string = '';
  deliveryDate: string = '';

  showConfirmPopup = false;
  showSuccessPopup = false;

  constructor(
    private router: Router,
    private addressService: UserAddressDetailService
  ) {
    const nav = this.router.getCurrentNavigation();
    const data = nav?.extras?.state;

    if (data) {
      this.product = data['product'];
      this.category = data['category'] || { name: 'N/A' };
      this.qty = data['quantity'] || 1;
      this.total = data['total'] || 0;
      this.deliveryDate = data['deliveryDate'] || '';
      this.orderDate = new Date().toLocaleString();

      const addressId = data['address']?.address_id || data['addressId'];
      if (addressId) {
        this.loadAddress(addressId);
      }
    }
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
