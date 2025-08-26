import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-update-password-component.html',
  styleUrls: ['./user-update-password-component.css'],
})
export class UserUpdatePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false; // keep for design, but won’t block redirect
  showSuccessModal: boolean = false;

  constructor(private router: Router) {}

  updatePassword() {
    // always show success modal (ignore validation for design purpose)
    this.passwordMismatch = false;
    this.showSuccessModal = true;

    // redirect after animation delay
    setTimeout(() => {
      this.router.navigate(['/farmvibe/signin']);
    }, 2000);
  }
}
