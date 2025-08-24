import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-product-details-component.html',
})
export class UserProductDetailsComponent {
  product = {
    id: 1,
    name: 'Organic Apple',
    description: 'Fresh and juicy organic apples.',
    price: 120,
    weight: '1kg',
    stock: 10,
    imageUrl: 'assets/product1.jpg',
    benefitList: ['Rich in vitamins', 'Boosts immunity', '100% organic'],
  };

  showModal = false;
  quantity = 1;
  orderDate = new Date().toISOString().split('T')[0];
  deliveryDate: string = '';

  openModal() {
    this.quantity = 1;
    this.deliveryDate = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  changeQuantity(delta: number) {
    let newQty = this.quantity + delta;
    if (newQty >= 1 && newQty <= this.product.stock) {
      this.quantity = newQty;
    }
  }

  continue() {
    if (!this.deliveryDate) {
      alert('Please select a delivery date.');
      return;
    }
    alert(
      `Proceeding with ${this.quantity} qty of ${this.product.name}, delivery on ${this.deliveryDate}`
    );
    this.closeModal();
  }
}
