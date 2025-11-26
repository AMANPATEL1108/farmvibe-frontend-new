import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
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
        console.log('Categories received from API:', data);
        console.log('Number of categories:', data.length);
        this.categories = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load categories. Please try again later.';
        this.isLoading = false;
        console.error('Error loading categories:', error);
      },
    });
  }

  goToCategoryWiseProducts(id: number) {
    console.log(id, name);
    this.router.navigate(['/farmvibe/category/product-category'], {
      queryParams: { id },
    });
  }
}
