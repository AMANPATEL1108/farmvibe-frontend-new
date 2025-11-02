// services/user-address-detail-service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface Address {
  address_id?: number;
  first_name: string;
  last_name: string;
  number: string;
  email: string;
  street: string;
  house_number: string;
  pincode: string;
  city: string;
  area: string;
  user_id?: number;
}

export interface Location {
  locationId?: number;
  city: string;
  areas: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UserAddressDetailService {
  private baseUrl = 'http://localhost:8080/user/address-details';
  private locationBaseUrl = 'http://localhost:8080/api/locations';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token && token.split('.').length === 3) {
        return token;
      }
      return null;
    }
    return null;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);

    if (error.status === 401 || error.status === 403) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
      return throwError(
        () => new Error('Session expired. Please login again.')
      );
    }

    if (error.error instanceof ErrorEvent) {
      return throwError(
        () => new Error('Network error. Please check your connection.')
      );
    } else {
      const serverError =
        error.error?.message || error.error?.error || 'Server error occurred';
      return throwError(() => new Error(serverError));
    }
  }

  // Get all addresses for the current user
  getAddresses(): Observable<Address[]> {
    return this.http
      .get<any>(`${this.baseUrl}/all`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          } else if (response.data && Array.isArray(response.data)) {
            return response.data;
          } else if (response.message) {
            return [];
          }
          return [];
        }),
        catchError(this.handleError.bind(this))
      );
  }

  // Get addresses by user ID
  getAddressesByUserId(userId: number): Observable<Address[]> {
    return this.http
      .get<any>(`${this.baseUrl}/user/${userId}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          } else if (response.data && Array.isArray(response.data)) {
            return response.data;
          } else if (response.message) {
            return [];
          }
          return [];
        }),
        catchError(this.handleError.bind(this))
      );
  }

  // Create new address
  createAddress(addressData: Address): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/create`, addressData, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Update address
  updateAddress(addressId: number, addressData: Address): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/update/${addressId}`, addressData, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Delete address
  deleteAddress(addressId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/delete/${addressId}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get all locations (cities and areas)
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.locationBaseUrl}/all`).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        } else if (response.data) {
          return response.data;
        }
        throw new Error('Invalid response format');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching locations:', error);
        // Return default locations if API fails
        const defaultLocations: Location[] = [
          {
            locationId: 1,
            city: 'Ahmedabad',
            areas: [
              'Maninagar',
              'Satellite',
              'Bopal',
              'Navrangpura',
              'Vastrapur',
            ],
          },
          {
            locationId: 2,
            city: 'Surat',
            areas: ['Adajan', 'Vesu', 'Varachha', 'Athwa', 'Piplod'],
          },
          {
            locationId: 3,
            city: 'Vadodara',
            areas: ['Alkapuri', 'Gotri', 'Fatehgunj', 'Akota', 'Maneja'],
          },
        ];
        return of(defaultLocations);
      })
    );
  }

  // Get all cities only
  getCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.locationBaseUrl}/cities`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching cities:', error);
        // Return default cities
        return of(['Ahmedabad', 'Surat', 'Vadodara', 'Mumbai', 'Delhi']);
      })
    );
  }

  // Get areas by city
  getAreasByCity(city: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.locationBaseUrl}/city/${city}/areas`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching areas:', error);
          // Return default areas based on city
          const defaultAreas = this.getDefaultAreasByCity(city);
          return of(defaultAreas);
        })
      );
  }

  private getDefaultAreasByCity(city: string): string[] {
    const defaultLocations: { [key: string]: string[] } = {
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
    return defaultLocations[city] || [];
  }
}
