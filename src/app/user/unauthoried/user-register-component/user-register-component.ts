import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterDTO } from './RegisterDTO';
import { UserRegisterComponentService } from './user-register-component-service';

@Component({
  selector: 'app-user-register-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-register-component.html',
  styleUrl: './user-register-component.css',
  providers: [UserRegisterComponentService],
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  showModal = false;
  otp: string = '';
  submitted = false;
  isLoading = false;
  otpVerified = false;
  errorMessage = '';
  showDebug = false; // For debugging

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserRegisterComponentService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [Validators.required, Validators.pattern('^(\\+91|[6-9])[0-9]{9}$')],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        profileImage: [null, Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  openOTPModal() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.valid) {
      this.isLoading = true;

      // Send OTP to the provided phone number
      const phone = this.registerForm.get('phone')?.value;
      console.log('Sending OTP to:', phone);

      this.authService.sendOtp(phone).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          console.log('OTP API Response:', response);

          // Handle the response
          if (response && response.success) {
            this.showModal = true;
            this.errorMessage = '';
            console.log('OTP sent successfully, showing modal');
          } else {
            this.errorMessage = response.message || 'Failed to send OTP';
            console.log('Failed to send OTP:', this.errorMessage);
            // Show modal anyway for manual OTP entry
            this.showModal = true;
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error sending OTP:', error);

          // Show modal even on error so user can try manual entry
          this.showModal = true;

          // Set appropriate error message
          if (error.includes('timeout') || error.includes('Timeout')) {
            this.errorMessage =
              'Request timeout. OTP might have been sent, please check your phone.';
          } else if (error.includes('CORS')) {
            this.errorMessage =
              'Server configuration issue. OTP might have been sent.';
          } else if (error.includes('Cannot connect to server')) {
            this.errorMessage =
              'Cannot connect to server. Please try again later.';
          } else {
            this.errorMessage =
              'Error: ' + error + '. You can still try entering OTP.';
          }

          console.log('Showing modal despite error for manual OTP entry');
        },
      });
    } else {
      this.errorMessage = 'Please fix the form errors before submitting.';

      // Show specific field errors
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (control && control.errors) {
          console.log(`Field ${key} has errors:`, control.errors);
        }
      });
    }
  }

  // Add this method to manually open modal for testing
  openModalManually() {
    this.showModal = true;
    this.errorMessage = 'Manually opened modal for testing';
  }

  closeOTPModal() {
    console.log('Close modal clicked');
    this.showModal = false;
    this.otp = '';
    this.otpVerified = false;
    this.errorMessage = ''; // Clear error message when closing modal
  }

  verifyOTP() {
    console.log('Entered OTP:', this.otp);
    this.errorMessage = '';

    if (this.otp.length !== 6) {
      this.errorMessage = 'Please enter a valid 6-digit OTP';
      return;
    }

    this.isLoading = true;
    const phone = this.registerForm.get('phone')?.value;

    this.authService.verifyOtp(phone, this.otp).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Verify OTP API Response:', response);

        if (response && response.success) {
          this.otpVerified = true;
          console.log('OTP verified successfully');

          // After OTP verification, register the user
          this.registerUser();
        } else {
          this.errorMessage = response.message || 'Invalid OTP';
          console.log('OTP verification failed:', this.errorMessage);
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error verifying OTP:', error);
        this.errorMessage = 'Failed to verify OTP. Please try again.';
      },
    });
  }

  registerUser() {
    if (this.registerForm.valid && this.otpVerified) {
      this.isLoading = true;

      const formData = this.registerForm.value;
      const userData: RegisterDTO = {
        username: formData.phone, // Use phone number as username
        user_firstName: formData.firstName,
        user_lastName: formData.lastName,
        user_email: formData.email,
        user_password: formData.password,
        profileImageUrl: formData.profileImage
          ? URL.createObjectURL(formData.profileImage)
          : '',
        role: 'USER', // Default role
      };

      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('User registered successfully:', response);
          this.showModal = false;
          this.router.navigate(['/farmvibe/home']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error registering user:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        },
      });
    }
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({
        profileImage: file,
      });
    }
  }

  // Test method to check API connection
  testApiConnection() {
    console.log('Testing API connection...');
    this.authService.sendOtp('9999999999').subscribe({
      next: (response) => {
        console.log('API test response:', response);
        alert(
          'API connection successful! Response: ' + JSON.stringify(response)
        );
      },
      error: (error) => {
        console.error('API test error:', error);
        alert('API connection failed: ' + error);
      },
    });
  }
}
