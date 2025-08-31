import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-admin-update-password-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-authorized-admin-update-password-component.html',
  styleUrl: './admin-authorized-admin-update-password-component.css',
})
export class AdminAuthorizedAdminUpdatePasswordComponent {
  constructor(private router: Router) {}

  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;
  showSuccessModal: boolean = false;

  handlePasswordReset() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
    this.showSuccessModal = true;

    setTimeout(() => {
      // Redirect after success
      this.router.navigate(['farmvibe/admin/login']);
    }, 2000);
  }
}
