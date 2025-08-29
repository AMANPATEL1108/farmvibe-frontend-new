import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header-component',
  imports: [],
  templateUrl: './admin-header-component.html',
  styleUrl: './admin-header-component.css',
})
export class AdminHeaderComponent {
  constructor(private router: Router) {}

  adminLogout() {
    this.router.navigate(['/farmvibe/admin/login']);
  }

  adminHomeDashboard() {
    this.router.navigate(['/farmvibe/authorized/admin/admin-dashboard-home']);
  }
  adminProduct() {
    this.router.navigate(['/farmvibe/authorized/admin/admin-products']);
  }
  adminUsersDashboard() {
    this.router.navigate(['/farmvibe/authorized/admin/users-dashboard']);
  }
  adminOrdersDashboard() {
    this.router.navigate(['/farmvibe/authorized/admin/orders-dashboard']);
  }
  adminProfilePage() {
    this.router.navigate(['/farmvibe/authorized/admin/admin-profile']);
  }
}
