import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHeaderComponentService } from './user-header-component-service';

@Component({
  selector: 'app-user-header-component',
  imports: [CommonModule],
  templateUrl: './user-header-component.html',
  styleUrls: ['./user-header-component.css'],
})
export class UserHeaderComponent implements OnInit {
  dropdownOpen = false;

  constructor(
    private router: Router,
    public headerService: UserHeaderComponentService
  ) {}

  ngOnInit() {
    // If we already have a token but the initial check hasn't completed yet,
    // trigger verification immediately (this handles page refreshes)
    const token = localStorage.getItem('authToken');
    if (token && !this.headerService.isInitialCheckComplete()) {
      this.headerService.verifyToken(token);
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.router.navigate(['farmvibe/user/user-profile']);
  }

  goToOrders() {
    this.router.navigate(['/farmvibe/user/user-active-orders']);
  }

  logout() {
    this.headerService.logout();
    this.router.navigate(['/farmvibe/signin']);
  }

  goToHomePage() {
    this.router.navigate(['/farmvibe/home']);
  }
  goToAboutPage() {
    this.router.navigate(['/farmvibe/about']);
  }
  goToContactPage() {
    this.router.navigate(['/farmvibe/contact']);
  }
  goToCategoryPage() {
    this.router.navigate(['/farmvibe/category']);
  }
  goToProductPage() {
    this.router.navigate(['/farmvibe/products']);
  }
  goToSignInPage() {
    this.router.navigate(['/farmvibe/signin']);
  }
  goToRegisterPage() {
    this.router.navigate(['/farmvibe/register']);
  }
}
