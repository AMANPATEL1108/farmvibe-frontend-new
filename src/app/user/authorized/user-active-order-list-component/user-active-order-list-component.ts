import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-active-order-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-active-order-list-component.html',
  styleUrl: './user-active-order-list-component.css',
})
export class UserActiveOrderListComponent {
  constructor(private router: Router) {}

  redirectToOldOrders() {
    this.router.navigate(['/farmvibe/user/user-older-orders']);
  }

  downloadInvoice(deliveryDate: string) {}
}
