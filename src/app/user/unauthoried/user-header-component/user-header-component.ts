import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header-component',
  imports: [],
  templateUrl: './user-header-component.html',
  styleUrl: './user-header-component.css',
})
export class UserHeaderComponent {
  constructor(private router: Router) {}

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
    this.router.navigate(['farmvibe/category']);
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
