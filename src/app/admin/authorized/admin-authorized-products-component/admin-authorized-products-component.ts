import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-products-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-authorized-products-component.html',
  styleUrls: ['./admin-authorized-products-component.css'],
})
export class AdminAuthorizedProductsComponent {
  products = [
    {
      name: 'Fresh Mango',
      category: 'Fruits',
      description: 'Juicy ripe mangoes from local farms',
      price: 100,
      quantity: 2,
      image: '/images/vegetables/tomato.jpeg',
    },
    {
      name: 'Organic Tomato',
      category: 'Vegetables',
      description: 'Farm fresh organic tomatoes',
      price: 60,
      quantity: 10,
      image: '/images/vegetables/tomato.jpeg',
    },
  ];

  showDeleteModal = false;
  showDeleteSuccess = false;
  selectedProduct: any = null;

  constructor(private router: Router, private ngZone: NgZone) {}

  navigateToAddProduct() {
    this.router.navigate(['/admin/pageUrl'], {
      queryParams: { page: 'aaddProduct' },
    });
  }

  navigateToEditProduct(product: any) {
    this.router.navigate(['/admin/pageUrl'], {
      queryParams: { page: 'editProduct', name: product.name },
    });
  }

  openDeleteModal(product: any) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  deleteProduct() {
    if (!this.selectedProduct) return;

    console.log('Deleted product:', this.selectedProduct.name);

    // Remove product from list
    this.products = this.products.filter((p) => p !== this.selectedProduct);

    // Close confirmation modal
    this.showDeleteModal = false;
    this.selectedProduct = null;

    // Show success modal
    this.showDeleteSuccess = true;

    // Auto close success modal after 2 sec
    this.ngZone.run(() => {
      setTimeout(() => {
        this.showDeleteSuccess = false;
      }, 2000);
    });
  }

  closeDeleteSuccessModal() {
    this.showDeleteSuccess = false;
  }
}
