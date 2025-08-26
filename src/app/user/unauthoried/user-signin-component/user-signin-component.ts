import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signin-component',
  imports: [],
  templateUrl: './user-signin-component.html',
  styleUrl: './user-signin-component.css',
})
export class UserSigninComponent {
  constructor(private router: Router) {}
  goToForgotPassword() {
    this.router.navigate(['/farmvibe/forgot-password']);
  }

  goTologinUser() {
    this.router.navigate(['/farmvibe/home']);
  }
}
