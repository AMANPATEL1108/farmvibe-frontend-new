import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-footer-component',
  imports: [],
  templateUrl: './user-footer-component.html',
  styleUrl: './user-footer-component.css',
})
export class UserFooterComponent {
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
}
