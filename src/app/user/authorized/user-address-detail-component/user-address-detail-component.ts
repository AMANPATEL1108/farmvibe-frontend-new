// user-address-detail-component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  UserAddressDetailService,
  Address,
  Location,
} from './user-address-detail-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-address-detail-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-address-detail-component.html',
  styleUrls: ['./user-address-detail-component.css'],
})
export class UserAddressDetailComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddressId: number | null = null;

  locations: Location[] = [];
  cities: string[] = [];
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
    city: '',
    area: '',
  };

  isLoading = false;
  currentUser: any = null;

  constructor(
    private router: Router,
    private addressService: UserAddressDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadAddresses();
    this.loadCities();
  }

  loadCurrentUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
  }

  loadAddresses() {
    this.isLoading = true;

    this.addressService.getAddresses().subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;
        this.isLoading = false;
        if (addresses.length > 0) {
          this.toastr.success('Addresses loaded successfully');
        }
      },
      error: (error) => {
        console.error('Error loading addresses:', error);
        this.addresses = [];
        this.isLoading = false;
        this.toastr.error('Failed to load addresses');
      },
    });
  }

  loadCities() {
    this.addressService.getCities().subscribe({
      next: (cities: string[]) => {
        this.cities = cities;
        this.toastr.success('Cities loaded successfully');
      },
      error: (error) => {
        console.error('Error loading cities:', error);
        this.cities = ['Ahmedabad', 'Surat', 'Vadodara', 'Mumbai', 'Delhi'];
        this.toastr.warning('Using default city data');
      },
    });
  }

  onCityChange(event: any): void {
    const city = event.target.value;
    this.selectedCity = city;
    this.newAddress.city = city;

    if (city) {
      this.addressService.getAreasByCity(city).subscribe({
        next: (areas: string[]) => {
          this.areas = areas;
          this.newAddress.area = ''; // Reset area when city changes
        },
        error: (error) => {
          console.error('Error loading areas:', error);
          this.areas = this.getDefaultAreasByCity(city);
        },
      });
    } else {
      this.areas = [];
      this.newAddress.area = '';
    }
  }

  private getDefaultAreasByCity(city: string): string[] {
    const defaultAreas: { [key: string]: string[] } = {
      Ahmedabad: [
        'Maninagar',
        'Satellite',
        'Bopal',
        'Navrangpura',
        'Vastrapur',
      ],
      Surat: ['Adajan', 'Vesu', 'Varachha', 'Athwa', 'Piplod'],
      Vadodara: ['Alkapuri', 'Gotri', 'Fatehgunj', 'Akota', 'Maneja'],
      Mumbai: ['Andheri', 'Bandra', 'Dadar', 'Powai', 'Juhu'],
      Delhi: ['Connaught Place', 'Karol Bagh', 'Dwarka', 'Rohini', 'Pitampura'],
    };
    return defaultAreas[city] || [];
  }

  continueWithSaved() {
    if (!this.selectedAddressId) {
      this.toastr.warning('Please select an address');
      return;
    }

    const selectedAddress = this.addresses.find(
      (addr) => addr.address_id === this.selectedAddressId
    );
    if (selectedAddress) {
      console.log('Continuing with address:', selectedAddress);
      this.router.navigate(['/farmvibe/products/payment-options']);
      this.toastr.success('Address selected successfully');
    } else {
      this.toastr.error('Selected address not found');
    }
  }

  saveNewAddress(): void {
    if (!this.isValidAddress(this.newAddress)) {
      this.toastr.warning('Please fill all required fields correctly');
      return;
    }

    this.isLoading = true;

    const addressToSave: Address = {
      ...this.newAddress,
      user_id: this.currentUser?.user_id,
    };

    this.addressService.createAddress(addressToSave).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Address saved successfully:', response);
        this.toastr.success('Address saved successfully');

        this.resetNewAddressForm();
        this.loadAddresses(); // Reload addresses to include the new one
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error saving address:', error);
        this.toastr.error(error.message || 'Failed to save address');
      },
    });
  }

  private isValidAddress(address: Address): boolean {
    return !!(
      address.first_name?.trim() &&
      address.last_name?.trim() &&
      address.number?.trim() &&
      address.email?.trim() &&
      address.street?.trim() &&
      address.house_number?.trim() &&
      address.pincode?.trim() &&
      address.city?.trim() &&
      address.area?.trim()
    );
  }

  private resetNewAddressForm(): void {
    this.newAddress = {
      first_name: '',
      last_name: '',
      number: '',
      email: '',
      street: '',
      house_number: '',
      pincode: '',
      city: '',
      area: '',
    };
    this.selectedCity = '';
    this.areas = [];
  }
}
