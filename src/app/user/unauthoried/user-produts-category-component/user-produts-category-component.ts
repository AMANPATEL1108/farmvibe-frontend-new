import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../user-products-component/product';
import { UserCategoryProductService } from './category-product.service';

@Component({
  selector: 'app-user-produts-category-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-produts-category-component.html',
  styleUrl: './user-produts-category-component.css',
})
export class UserProdutsCategoryComponent implements OnInit {
  categoryId!: number;
  categoryName: string = '';
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userCategoryProductService: UserCategoryProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get category ID and name from query params
    this.route.queryParams.subscribe((params) => {
      this.categoryId = +params['id']; // convert to number
      this.categoryName = params['name'] || '';
      if (this.categoryId) {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.userCategoryProductService
      .getProductsByCategory(this.categoryId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.products = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products. Please try again later.';
          this.isLoading = false;
          console.error('Error loading products:', err);
        },
      });
  }

  goToProductDetailsPage(productId: number) {
    this.router.navigate(['/farmvibe/products/product-details'], {
      queryParams: { id: productId },
    });
  }
}
