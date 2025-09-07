import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from './LoginRequest';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSigninComponentService } from './user-signin-component-service';

@Component({
  selector: 'app-user-signin-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-signin-component.html',
  styleUrls: ['./user-signin-component.css'],
})
export class UserSigninComponent {
  // <-- FIX: must match your import in app.routes.ts
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: UserSigninComponentService
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^(\\+91|[6-9])[0-9]{9}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Get form control by name (safe access)
  getFormControl(controlName: string): AbstractControl | null {
    return this.loginForm.get(controlName);
  }

  // Check if control has error
  hasError(controlName: string, errorType: string): boolean {
    const control = this.getFormControl(controlName);
    return control
      ? control.hasError(errorType) && (control.touched || this.submitted)
      : false;
  }

  goToForgotPassword(): void {
    this.router.navigate(['/farmvibe/forgot-password']);
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.isLoading = true;

    const loginData = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userPhone', loginData.username);
          this.router.navigate(['/farmvibe/home']);
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      error: (error: any) => {
        this.isLoading = false;

        if (error.status === 401) {
          this.loginForm
            .get('password')
            ?.setErrors({ invalidCredentials: true });
        } else if (error.status === 404) {
          this.loginForm.get('username')?.setErrors({ userNotFound: true });
        } else if (error.status === 0) {
          this.errorMessage =
            'Cannot connect to server. Please try again later.';
        } else {
          this.errorMessage = error.error || 'An unexpected error occurred';
        }
      },
    });
  }
}
