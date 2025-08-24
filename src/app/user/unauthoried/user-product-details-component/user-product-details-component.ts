import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-product-details-component.html',
})
export class UserProductDetailsComponent {
  constructor(private router: Router) {}

  private get modalEl(): HTMLElement | null {
    return document.getElementById('quantityModal');
  }
  private get orderDateEl(): HTMLElement | null {
    return document.getElementById('orderDate');
  }
  private get quantityInputEl(): HTMLInputElement | null {
    return document.getElementById('quantityInput') as HTMLInputElement | null;
  }
  private get deliveryDateEl(): HTMLInputElement | null {
    return document.getElementById('deliveryDate') as HTMLInputElement | null;
  }

  openQuantityModel(): void {
    console.log('Called Open Quantity MDoel');
    this.openModal();
  }

  openModal(): void {
    const today = new Date().toISOString().split('T')[0];

    // Set order date text
    if (this.orderDateEl) this.orderDateEl.textContent = today;

    // Set min attribute for delivery date
    if (this.deliveryDateEl) this.deliveryDateEl.setAttribute('min', today);

    // Show modal
    if (this.modalEl) {
      this.modalEl.classList.remove('hidden');
      this.modalEl.classList.add('flex');
    }
  }

  closeModal(): void {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
      this.modalEl.classList.remove('flex');
    }
  }

  changeQuantity(delta: number): void {
    const input = this.quantityInputEl;
    if (!input) return;

    const min = parseInt(input.min || '1', 10);
    const max = parseInt(input.max || '10', 10);
    let quantity = parseInt(input.value || '1', 10);

    quantity += delta;
    if (quantity >= min && quantity <= max) {
      input.value = String(quantity);
    }
  }

  proceed(): void {
    // Navigate to the address details page
    this.router.navigate(['/farmvibe/products/address']);
  }
}
