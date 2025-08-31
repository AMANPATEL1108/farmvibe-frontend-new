import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-admin-forgot-password-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-admin-forgot-password-component.html',
  styleUrl: './admin-admin-forgot-password-component.css',
})
export class AdminAdminForgotPasswordComponent {
  mobile: string = '';
  otp: string = '';
  otpError: boolean = false;

  showOtpModal: boolean = false;
  showSuccessModal: boolean = false;

  constructor(private router: Router) {}

  sendOtp() {
    if (!/^\d{10}$/.test(this.mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // For now just open OTP modal (static demo)
    this.showOtpModal = true;
  }

  closeOtpModal() {
    this.showOtpModal = false;
  }

  verifyOtp() {
    if (/^\d{6}$/.test(this.otp)) {
      this.otpError = false;
      this.showOtpModal = false;
      this.showSuccessModal = true;

      // Redirect after success
      setTimeout(() => {
        this.router.navigate(['/farmvibe/admin/update-password-admin']); // <-- change route if needed
      }, 2000);
    } else {
      this.otpError = true;
    }
  }
}
