import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Category, CategoryService } from './category.service';

@Component({
  selector: 'app-user-category-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-category-component.html',
  styleUrl: './user-category-component.css',
})
export class UserCategoryComponent {
  categories: Category[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  private baseUrl = 'http://localhost:8080';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load categories. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  goToCategoryWiseProducts(id: number) {
    this.router.navigate(['/farmvibe/category/product-category'], {
      state: { id: id },
    });
  }
}
