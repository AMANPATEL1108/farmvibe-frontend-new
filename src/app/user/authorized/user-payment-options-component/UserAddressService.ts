// user-address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  address_id: number; // required
  street: string;
  city: string;
  area: string;
  house_number: string;
  pincode: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  number?: string;
  user_id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  private baseUrl = 'http://localhost:8080/user/address-details';

  constructor(private http: HttpClient) {}

  /** Fetch a single address by ID */
  getAddressById(addressId: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/${addressId}`);
  }
}
