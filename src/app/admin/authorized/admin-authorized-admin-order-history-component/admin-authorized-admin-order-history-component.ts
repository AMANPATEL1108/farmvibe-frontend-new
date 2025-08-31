import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-authorized-admin-order-history-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-authorized-admin-order-history-component.html',
  styleUrl: './admin-authorized-admin-order-history-component.css',
})
export class AdminAuthorizedAdminOrderHistoryComponent {
  orders = [
    {
      id: 1,
      customer: 'Amit Kumar',
      address: '123 Green Street, Delhi',
      details: ['2kg Organic Mangoes', '1kg Basmati Rice'],
      category: 'Fruits, Grains',
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      orderDate: '2025-05-18',
      requestedDate: '2025-05-25',
      confirmed: 'Confirmed',
    },
    {
      id: 2,
      customer: 'Riya Sharma',
      address: '45 Sunrise Avenue, Mumbai',
      details: ['1L Organic Milk', '500g Cheese'],
      category: 'Dairy',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Not Delivered',
      orderDate: '2025-05-19',
      requestedDate: '2025-05-27',
      confirmed: 'Pending',
    },
    {
      id: 3,
      customer: 'Sameer Khan',
      address: '88 Eco Park Road, Bengaluru',
      details: ['3kg Potatoes', '2kg Tomatoes'],
      category: 'Vegetables',
      paymentStatus: 'Paid',
      deliveryStatus: 'In Transit',
      orderDate: '2025-05-20',
      requestedDate: '2025-05-26',
      confirmed: 'Confirmed',
    },
  ];

  // Modal state
  selectedOrder: any = null;

  showDetails(order: any) {
    this.selectedOrder = order;
  }

  closeDetails() {
    this.selectedOrder = null;
  }
}
