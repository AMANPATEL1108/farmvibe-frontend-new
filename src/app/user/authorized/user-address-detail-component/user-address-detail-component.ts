import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface Address {
  id?: number;
  first_name: string;
  last_name: string;
  number: string;
  email: string;
  street: string;
  house_number: string;
  pincode: string;
  city?: string;
  area?: string;
}

@Component({
  selector: 'app-user-address-detail-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-address-detail-component.html',
  styleUrl: './user-address-detail-component.css',
})
export class UserAddressDetailComponent {
  addresses: Address[] = [
    {
      id: 1,
      first_name: 'Aman',
      last_name: 'Patel',
      street: 'Om Society',
      house_number: '12/A',
      pincode: '380001',
      number: '9876543210',
      email: 'aman@gmail.com',
    },
    {
      id: 2,
      first_name: 'Ravi',
      last_name: 'Shah',
      street: 'Main Road',
      house_number: '45/B',
      pincode: '380002',
      number: '9123456789',
      email: 'ravi@gmail.com',
    },
  ];

  selectedAddressId: number | null = null;

  cities: string[] = ['Ahmedabad', 'Surat', 'Vadodara'];
  areas: string[] = [];
  selectedCity: string = '';

  newAddress: Address = {
    first_name: '',
    last_name: '',
    number: '',
    email: '',
    street: '',
    house_number: '',
    pincode: '',
  };

  constructor(private router: Router) {}

  continueWithSaved() {
    this.router.navigate(['/farmvibe/products/payment-options']);
    console.log('called a Continue WItha savae ');
  }

  onCityChange(event: any): void {
    const city = event.target.value;
    if (city === 'Ahmedabad') {
      this.areas = ['Maninagar', 'Satellite', 'Bopal'];
    } else if (city === 'Surat') {
      this.areas = ['Adajan', 'Vesu', 'Varachha'];
    } else if (city === 'Vadodara') {
      this.areas = ['Alkapuri', 'Gotri', 'Fatehgunj'];
    } else {
      this.areas = [];
    }
  }

  saveNewAddress(): void {
    console.log('Saving new address:', this.newAddress);
    alert('New address saved successfully (frontend only)');
  }
}
