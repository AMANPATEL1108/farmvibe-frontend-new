import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  UserAddressDetailService,
  Address,
} from '../user-address-detail-component/user-address-detail-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-payment-options-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-payment-options-component.html',
  styleUrl: './user-payment-options-component.css',
})
export class UserPaymentOptionsComponent {
  selectedMethod: 'online' | 'offline' = 'online';

  product: any = null;
  qty: number = 1;
  orderDate: string = new Date().toISOString().split('T')[0];
  deliveryDate: string = '';
  address: Address | null = null;

  category: { name: string } = { name: 'N/A' };
  total: number = 0;

  totalPrice: number = 0;

  constructor(
    private router: Router,
    private addressService: UserAddressDetailService,
    private toastr: ToastrService
  ) {
    const nav = this.router.getCurrentNavigation();
    const data = nav?.extras?.state;

    if (data) {
      this.product = data['product'];
      this.category = data['category'] || { name: 'N/A' };
      this.qty = data['quantity'] || 1;
      this.total = data['total'] || 0;
      this.totalPrice = this.total;
      this.deliveryDate = data['deliveryDate'] || '';
      this.orderDate = new Date().toLocaleString();

      const addressId = data['addressId'];
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
          this.toastr.error('Address not found');
        }
      },
      error: (err) => console.error(err),
    });
  }

  showDetails(method: 'online' | 'offline') {
    this.selectedMethod = method;
  }

  proceedOnline() {
    if (!this.address) return;
    this.router.navigate(['/farmvibe/products/payment-options/online'], {
      state: {
        product: this.product,
        quantity: this.qty,
        deliveryDate: this.deliveryDate,
        address: this.address,
        total: this.totalPrice,
        category: this.category,
      },
    });
  }

  proceedCOD() {
    if (!this.address) return;
    this.router.navigate(['/farmvibe/products/payment-options/cod'], {
      state: {
        product: this.product,
        quantity: this.qty,
        deliveryDate: this.deliveryDate,
        address: this.address,
        total: this.totalPrice,
        category: this.category,
      },
    });
  }
}
