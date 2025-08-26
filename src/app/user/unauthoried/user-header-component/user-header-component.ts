import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header-component',
  imports: [CommonModule],
  templateUrl: './user-header-component.html',
  styleUrls: ['./user-header-component.css'],
})
export class UserHeaderComponent {
  dropdownOpen = false;

  constructor(private router: Router) {}

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
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtIssuedAt');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
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
