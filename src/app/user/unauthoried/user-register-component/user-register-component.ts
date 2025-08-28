import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈 Needed for [(ngModel)]

@Component({
  selector: 'app-user-register-component',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 add FormsModule
  templateUrl: './user-register-component.html',
  styleUrl: './user-register-component.css',
})
export class UserRegisterComponent {
  constructor(private router: Router) {}

  showModal = false;
  otp: string = '';

  openOTPModal() {
    console.log('Register clicked');
    this.showModal = true;
  }

  closeOTPModal() {
    console.log('Close modal clicked');
    this.showModal = false;
  }

  verifyOTP() {
    console.log('Entered OTP:', this.otp);

    // 👉 Here you can add actual OTP validation logic
    if (this.otp.length === 6) {
      this.showModal = false;
      this.router.navigate(['/farmvibe/home']);
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  }
}
