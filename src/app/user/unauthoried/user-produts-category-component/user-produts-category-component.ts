import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-produts-category-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-produts-category-component.html',
  styleUrl: './user-produts-category-component.css',
})
export class UserProdutsCategoryComponent {
  constructor(private router: Router) {}

  // ✅ Input properties (data comes from parent / API)

  categoryName: string = 'Vegetables';

  products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      description: 'Juicy red tomatoes grown organically.',
      price: 40,
      weight: 'kg',
      stock: 10,
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Tomatoes',
    },
    {
      id: 2,
      name: 'Green Cucumbers',
      description: 'Crisp and refreshing cucumbers.',
      price: 30,
      weight: 'kg',
      stock: 0,
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Cucumbers',
    },
  ];

  goToProductDetailsPage() {
    this.router.navigate(['/farmvibe/products/product-details']);
  }
}
