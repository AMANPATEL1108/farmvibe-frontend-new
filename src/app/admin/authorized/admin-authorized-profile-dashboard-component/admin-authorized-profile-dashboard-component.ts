import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-authorized-profile-dashboard-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-authorized-profile-dashboard-component.html',
  styleUrls: ['./admin-authorized-profile-dashboard-component.css'],
})
export class AdminAuthorizedProfileDashboardComponent {
  profile = {
    name: 'Aman Kumar',
    email: 'aman@example.com',
    phone: '9876543210',
    address: 'Patna, Bihar, India',
  };

  showEditModal = false;
  showVerifyModal = false;
  showOtpModal = false;
  showSuccessModal = false;

  tempProfile: any = { ...this.profile };
  otp: string = '';
  successMessage: string = '';

  openEditModal() {
    this.tempProfile = { ...this.profile };
    this.showEditModal = true;
  }

  closeModal(type: string) {
    if (type === 'edit') this.showEditModal = false;
    if (type === 'verify') this.showVerifyModal = false;
    if (type === 'otp') this.showOtpModal = false;
    if (type === 'success') this.showSuccessModal = false;
  }

  updateDetails() {
    this.showEditModal = false;
    this.showVerifyModal = true;
  }

  selectVerification(method: string) {
    console.log('Verification via:', method);
    this.showVerifyModal = false;
    this.showOtpModal = true;
  }

  verifyOtp() {
    if (this.otp.length === 6 && /^\d+$/.test(this.otp)) {
      this.profile = { ...this.tempProfile };
      this.showOtpModal = false;
      this.successMessage = '✅ Details updated successfully!';
      this.showSuccessModal = true;

      // ✅ Auto-close modal after 2 seconds, no redirect
      setTimeout(() => {
        this.showSuccessModal = false;
      }, 2000);
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  }
}
