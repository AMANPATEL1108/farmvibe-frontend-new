import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../user-products-component/product';
import { UserCategoryProductService } from './category-product.service';
import { ProductDataService } from '../ProductDataService';

@Component({
  selector: 'app-user-produts-category-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-produts-category-component.html',
  styleUrl: './user-produts-category-component.css',
})
export class UserProdutsCategoryComponent implements OnInit {
  categoryId: number | null = null;
  categoryName: string = '';
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productDataService: ProductDataService,
    private userCategoryProductService: UserCategoryProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.productDataService.getProductId();

    if (this.categoryId) {
      this.loadProducts(this.categoryId);
      // Optional: Clear the ID after use if needed
      // this.productDataService.clearProductId();
    } else {
      this.error = 'Product ID not found';
      this.isLoading = false;
    }
  }

  loadProducts(categoryIdis: number): void {
    console.log('My id is ', categoryIdis);
    this.isLoading = true;
    this.error = null;

    this.userCategoryProductService
      .getProductsByCategory(categoryIdis)
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
