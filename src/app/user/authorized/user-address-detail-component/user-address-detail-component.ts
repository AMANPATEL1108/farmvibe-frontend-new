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
  navData: any = null;
  productId: number | null = null;
  quantity: number | null = null;
  deliveryDate: any = null;
  product: any = null;

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
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.navData = navigation?.extras?.state || null;

    if (this.navData) {
      this.productId = this.navData.productId;
      this.quantity = this.navData.quantity;
      this.deliveryDate = this.navData.deliveryDate;
      this.product = this.navData.product;
    }
  }

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

    // Pass only addressId and product/order info
    this.router.navigate(['/farmvibe/products/payment-options'], {
      state: {
        addressId: this.selectedAddressId, 
        product: this.product,
        quantity: this.quantity,
        deliveryDate: this.deliveryDate,
        category: this.product?.category || { name: 'N/A' },
        total: this.product?.price * (this.quantity || 1),
      },
    });
  }

  saveNewAddress(): void {
    if (!this.isValidAddress(this.newAddress)) {
      this.toastr.warning('Please fill all required fields correctly');
      return;
    }

    this.isLoading = true;

    const addressToSave: Address = {
      ...this.newAddress,
      user_id: Number(localStorage.getItem('userId')),
    };

    this.addressService.createAddress(addressToSave).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        // Use returned address_id from API
        const newAddressId = response?.address_id;
        if (!newAddressId) {
          this.toastr.error('Failed to get saved address ID');
          return;
        }

        this.toastr.success('Address saved successfully');

        // Navigate to next page with newly created address_id
        this.router.navigate(['/farmvibe/products/payment-options'], {
          state: {
            addressId: newAddressId,
            product: this.product,
            quantity: this.quantity,
            deliveryDate: this.deliveryDate,
            category: this.product?.category || { name: 'N/A' },
            total: this.product?.price * (this.quantity || 1),
          },
        });
      },
      error: (error) => {
        this.isLoading = false;
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
