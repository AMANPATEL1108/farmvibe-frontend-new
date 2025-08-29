import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-footer-component',
  imports: [],
  templateUrl: './admin-footer-component.html',
  styleUrl: './admin-footer-component.css',
})
export class AdminFooterComponent {
  constructor(private router: Router) {}

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
}
