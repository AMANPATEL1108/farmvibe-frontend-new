import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSigninComponentService } from './user-signin-component-service';
import { UserHeaderComponentService } from '../user-header-component/user-header-component-service';

@Component({
  selector: 'app-user-signin-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add necessary imports here
  templateUrl: './user-signin-component.html',
  styleUrls: ['./user-signin-component.css'],
})
export class UserSigninComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: UserSigninComponentService,
    private headerService: UserHeaderComponentService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;

          // Store token
          localStorage.setItem('authToken', response.token);

          // Store user details separately
          localStorage.setItem('userId', response.user.userId.toString());
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('email', response.user.email);

          // Also optional: store whole user object if needed
          // localStorage.setItem('currentUser', JSON.stringify(response.user));

          this.headerService.setAuthentication(response.token);
          this.router.navigate(['/farmvibe/home']);
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
            this.loginForm
              .get('password')
              ?.setErrors({ invalidCredentials: true });
          } else if (error.status === 404) {
            this.errorMessage = 'User not found';
            this.loginForm.get('username')?.setErrors({ userNotFound: true });
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword() {
    this.router.navigate(['/farmvibe/forgot-password']);
  }
}
