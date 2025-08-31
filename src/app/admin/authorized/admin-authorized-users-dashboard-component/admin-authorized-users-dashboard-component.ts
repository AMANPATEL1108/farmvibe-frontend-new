import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-authorized-users-dashboard-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-authorized-users-dashboard-component.html',
  styleUrl: './admin-authorized-users-dashboard-component.css',
})
export class AdminAuthorizedUsersDashboardComponent {
  users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobile: '9876543210',
      address: '123 Mango Street, Pune',
      createdAt: '2024-05-18',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      mobile: '9876543211',
      address: '45 Banana Road, Mumbai',
      createdAt: '2024-06-10',
    },
    {
      id: 3,
      firstName: 'Arjun',
      lastName: 'Patel',
      email: 'arjun.patel@example.com',
      mobile: '9876543212',
      address: '78 Grape Lane, Delhi',
      createdAt: '2024-07-01',
    },
  ];

  showDeleteModal = false;
  showSuccessModal = false;
  userToDelete: any = null;

  confirmDelete(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  deleteUser() {
    if (this.userToDelete) {
      // Remove user from list
      this.users = this.users.filter((u) => u.id !== this.userToDelete.id);
      this.closeModal();

      // Show success modal
      this.showSuccessModal = true;
    }
  }
}
