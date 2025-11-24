import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService, Category } from './category.service';

@Component({
  selector: 'app-user-products-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-produts-category-component.html',
  styleUrls: ['./user-produts-category-component.css'],
})
export class UserProdutsCategoryComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  private baseUrl = 'http://localhost:8080'; // Backend base URL

  constructor(private categoryService: CategoryService) {}

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

  /**
   * Get the full image URL from the backend
   */
  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'assets/images/placeholder.jpg'; // Fallback image
    }

    // If the URL is already absolute, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // Remove leading slash if present and construct full URL
    const cleanPath = imageUrl.startsWith('/')
      ? imageUrl.substring(1)
      : imageUrl;
    return `${this.baseUrl}/${cleanPath}`;
  }

  /**
   * Handle image load errors
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder.jpg'; // Use a placeholder image
    console.warn('Failed to load image, using placeholder');
  }

  goToProductDetailsPage(): void {
    // Your existing implementation
  }
}
