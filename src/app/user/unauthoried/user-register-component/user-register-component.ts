import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-register-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-register-component.html',
  styleUrl: './user-register-component.css',
})
export class UserRegisterComponent {
  showModal = false;

  openOTPModal() {
    console.log('Register clicked');
    this.showModal = true;
  }

  closeOTPModal() {
    this.showModal = false;
  }
}
