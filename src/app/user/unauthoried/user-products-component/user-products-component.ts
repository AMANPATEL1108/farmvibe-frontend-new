import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-products-component',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './user-products-component.html',
  styleUrl: './user-products-component.css',
})
export class UserProductsComponent {
  products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      description: 'Juicy, organic tomatoes straight from the farm.',
      price: 40,
      weight: 'kg',
      stock: true,
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Fresh+Tomatoes',
    },
    {
      id: 2,
      name: 'Organic Carrots',
      description: 'Crunchy and sweet carrots grown without chemicals.',
      price: 60,
      weight: 'kg',
      stock: false,
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Organic+Carrots',
    },
  ];
}
