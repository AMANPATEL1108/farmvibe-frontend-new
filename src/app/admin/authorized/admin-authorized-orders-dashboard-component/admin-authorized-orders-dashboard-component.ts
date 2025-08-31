import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-orders-dashboard-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-authorized-orders-dashboard-component.html',
  styleUrls: ['./admin-authorized-orders-dashboard-component.css'],
})
export class AdminAuthorizedOrdersDashboardComponent {
  constructor(private router: Router) {}

  orders = [
    {
      id: 1,
      name: 'Ananya Roy',
      address: '24 Lotus Enclave, Kolkata',
      orderDetails: '4kg Bananas',
      category: 'Fruits',
      preferredDate: '2025-05-25',
      orderDate: '2025-05-22',
      email: 'ananya.roy@example.com',
      mobile: '+91 9876543210',
    },
    {
      id: 2,
      name: 'Rohit Verma',
      address: '17 Neem Marg, Jaipur',
      orderDetails: '1kg Paneer',
      category: 'Dairy',
      preferredDate: '2025-05-27',
      orderDate: '2025-05-23',
      email: 'rohit.verma@example.com',
      mobile: '+91 9123456780',
    },
    {
      id: 3,
      name: 'Neha Kapoor',
      address: '99 Lake View, Bhopal',
      orderDetails: '500g Spinach',
      category: 'Vegetables',
      preferredDate: '2025-05-24',
      orderDate: '2025-05-21',
      email: 'neha.kapoor@example.com',
      mobile: '+91 9988776655',
    },
  ];

  confirmModal = false;
  successPopup = false;
  moreDetailsModal = false;

  selectedOrder: any = null;

  // Show confirm popup
  showConfirmPopup() {
    this.confirmModal = true;
  }

  // Hide confirm popup
  hideConfirmPopup() {
    this.confirmModal = false;
  }

  // Confirm order → show success modal
  confirmOrder() {
    this.confirmModal = false;
    this.successPopup = true;

    // Auto close success modal after 2 seconds
    setTimeout(() => {
      this.successPopup = false;
    }, 2000);
  }

  // Manual close for success popup
  closeSuccessModal() {
    this.successPopup = false;
  }

  // Show more details
  showMoreDetails(order: any) {
    this.selectedOrder = order;
    this.moreDetailsModal = true;
  }

  // Close more details modal
  closeMoreDetails() {
    this.moreDetailsModal = false;
  }

  olderOrderCompleted() {
    this.router.navigate(['farmvibe/authorized/admin/old-orders-history']);
  }
}
