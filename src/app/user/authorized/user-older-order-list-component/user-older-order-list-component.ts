import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-older-order-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-older-order-list-component.html',
  styleUrl: './user-older-order-list-component.css',
})
export class UserOlderOrderListComponent {
  constructor(private router: Router) {}

  redirectToCurrentOrders() {
    this.router.navigate(['/farmvibe/user/user-active-orders']);
  }

  downloadInvoice(deliveryDate: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }

    const url = `/download-delivered-invoice?deliveryDate=${encodeURIComponent(
      deliveryDate
    )}&userId=${userId}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice_${userId}_${deliveryDate}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
