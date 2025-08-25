import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-category-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-category-component.html',
  styleUrl: './user-category-component.css',
})
export class UserCategoryComponent {
  constructor(private router: Router) {}

  categories = [
    {
      name: 'Vegetables',
      description: 'Fresh organic vegetables directly from the farm.',
      category_image_url: 'assets/images/categories/vegetables.webp',
    },
    {
      name: 'Fruits',
      description: 'Seasonal fruits full of natural sweetness.',
      category_image_url: 'assets/images/categories/fruits.webp',
    },
  ];

  categoryProduct() {
    this.router.navigate(['/farmvibe/category/product-category']);
  }
}
