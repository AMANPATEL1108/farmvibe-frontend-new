import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-forgot-password-component',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './user-forgot-password-component.html',
  styleUrl: './user-forgot-password-component.css',
})
export class UserForgotPasswordComponent {
  mobileNumber: string = '';
  otpCode: string = '';
  showOtpModal: boolean = false;
  showSuccessModal: boolean = false;
  otpError: boolean = false;

  constructor(private router: Router) {}

  // Step 1: Send OTP
  sendOtp() {
    if (!/^\d{10}$/.test(this.mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    console.log('Sending OTP to:', this.mobileNumber);

    // Mock success
    this.showOtpModal = true;
  }

  // Step 2: Validate OTP field
  validateOtp() {
    this.otpError = !/^\d{6}$/.test(this.otpCode);
  }

  // Step 3: Verify OTP
  verifyOtp() {
    if (!/^\d{6}$/.test(this.otpCode)) {
      this.otpError = true;
      return;
    }

    console.log('Verifying OTP:', this.otpCode);

    // Mock verification success
    this.showOtpModal = false;
    this.showSuccessModal = true;

    // Redirect after 2s
    setTimeout(() => {
      console.log('Redirecting to reset-password page...');
      this.router.navigate(['farmvibe/user/update-password']);
      // replace with Angular route navigation later
    }, 2000);
  }

  // Close OTP modal
  closeOtpModal() {
    this.showOtpModal = false;
  }
}
