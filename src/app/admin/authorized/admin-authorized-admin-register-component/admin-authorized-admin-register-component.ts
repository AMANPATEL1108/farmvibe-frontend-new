import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-admin-register-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-authorized-admin-register-component.html',
  styleUrls: ['./admin-authorized-admin-register-component.css'],
})
export class AdminAuthorizedAdminRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showModal: boolean = false;
  verified: boolean = false;
  showSuccessModal: boolean = false; // for success animation
  otp: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      profileImage: [null, Validators.required],
    });
  }

  openVerificationModal() {
    if (this.registerForm.valid) {
      this.showModal = true;
      console.log('Verification modal opened');
    } else {
      alert('Please fill all required fields.');
    }
  }

  closeVerificationModal() {
    this.showModal = false;
    this.otp = '';
    this.verified = false;
    this.showSuccessModal = false;
  }

  verifyOtp() {
    if (String(this.otp).length === 6) {
      this.verified = true;
      this.showSuccessModal = true; // show success message with animation

      // Optional: submit form to backend here
      // this.submitForm();

      // Close modal and redirect after 2 seconds
      setTimeout(() => {
        this.showModal = false;
        this.router.navigate([
          '/farmvibe/authorized/admin/admin-dashboard-home',
        ]);
      }, 2000);
    }
  }

  goBack() {
    window.history.back();
  }
}
