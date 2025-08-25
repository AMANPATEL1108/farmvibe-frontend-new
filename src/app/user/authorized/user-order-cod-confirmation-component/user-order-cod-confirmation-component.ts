import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-order-cod-confirmation-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-order-cod-confirmation-component.html',
  styleUrl: './user-order-cod-confirmation-component.css',
})
export class UserOrderCodConfirmationComponent {
  constructor(private router: Router) {}

  // 🔹 Static dummy data
  address = {
    first_name: 'Aman',
    last_name: 'Patel',
    email: 'amanpatel@gmail.com',
    number: '9876543210',
    house_number: '12/A',
    street: 'Om Society',
    area: 'Satellite',
    pincode: '380015',
  };

  product = { name: 'Fresh Tomatoes', price: 40 };
  category = { name: 'Vegetables' };
  qty = 3;
  total = this.product.price * this.qty;
  orderDate = '2025-05-23';
  deliveryDate = '2025-05-25';

  // 🔹 State for popups
  showConfirmPopup = false;
  showSuccessPopup = false;

  // 🔹 Functions
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
