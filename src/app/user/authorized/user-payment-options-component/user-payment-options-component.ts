import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-payment-options-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-payment-options-component.html',
  styleUrl: './user-payment-options-component.css',
})
export class UserPaymentOptionsComponent {
  constructor(private router: Router) {}

  selectedMethod: 'online' | 'offline' = 'online';

  product = {
    name: 'Fresh Apples',
    price: 120, // per kg
  };

  qty = 2; // quantity in kg
  orderDate = '2025-08-24';
  deliveryDate = '2025-08-26';

  address = {
    first_name: 'Aman',
    last_name: 'Patel',
    house_number: '12/A',
    street: 'Om Society',
    area: 'Satellite',
    pincode: '380015',
  };

  totalPrice = this.product.price * this.qty;

  // Methods
  showDetails(method: 'online' | 'offline') {
    this.selectedMethod = method;
  }

  proceedOnline() {
    this.router.navigate(['/farmvibe/products/payment-options/online']);
  }

  proceedCOD() {
    this.router.navigate(['/farmvibe/products/payment-options/cod']);
  }
}
