import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-category-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-category-component.html',
  styleUrl: './user-category-component.css',
})
export class UserCategoryComponent {
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
}
