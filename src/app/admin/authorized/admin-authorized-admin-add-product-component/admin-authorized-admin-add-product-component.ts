import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-admin-add-product-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-authorized-admin-add-product-component.html',
  styleUrls: ['./admin-authorized-admin-add-product-component.css'],
})
export class AdminAuthorizedAdminAddProductComponent {
  product = {
    name: '',
    category: '',
    description: '',
    price: null,
    quantity: null,
    image: null as File | null,
  };

  showAddModal = false;

  constructor(private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }

  onSubmit() {
    console.log('Product Added:', this.product);

    // 👉 show success modal
    this.showAddModal = true;

    // 👉 auto close modal and redirect after 2 sec
    setTimeout(() => {
      this.showAddModal = false;
      this.router.navigate(['/farmvibe/authorized/admin/admin-products']);
    }, 2000);
  }

  onCancel() {
    this.router.navigate(['/farmvibe/authorized/admin/admin-products']);
  }
}
