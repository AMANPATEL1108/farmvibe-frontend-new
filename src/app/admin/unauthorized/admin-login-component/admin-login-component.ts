import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login-component',
  imports: [],
  templateUrl: './admin-login-component.html',
  styleUrl: './admin-login-component.css',
})
export class AdminLoginComponent {
  constructor(private router: Router) {}

  adminLogin() {
    this.router.navigate(['farmvibe/authorized/admin/admin-dashboard-home']);
  }
}
