import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-admin-edit-product-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-authorized-admin-edit-product-component.html',
  styleUrl: './admin-authorized-admin-edit-product-component.css',
})
export class AdminAuthorizedAdminEditProductComponent {
  // Static product data
  product = {
    name: 'Fresh Mango',
    category: 'Fruits',
    price: 100,
    quantity: 10,
    description: 'Delicious ripe mangoes from our farm.',
    image: '/images/vegetables/tomato.jpeg',
  };

  showUpdateSuccess = false;

  constructor(private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = URL.createObjectURL(file); // preview
    }
  }

  onCancel() {
    this.router.navigate(['/admin/pageUrl'], {
      queryParams: { page: 'aproducts' },
    });
  }

  onSave() {
    console.log('Updated Product:', this.product);

    // ✅ Show success modal
    this.showUpdateSuccess = true;

    // ✅ Close modal & redirect after 2 sec
    setTimeout(() => {
      this.showUpdateSuccess = false;
      this.router.navigate(['/farmvibe/authorized/admin/admin-products']);
    }, 2000);
  }
}
