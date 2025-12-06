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
  categoryId: number | null = null;
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
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { id?: number };

    this.categoryId = state?.id ?? history.state.id;

    if (this.categoryId) {
      this.loadProducts(this.categoryId);
    } else {
      this.error = 'Category ID not found';
      this.isLoading = false;
    }
  }

  loadProducts(categoryIdis: number): void {
    this.isLoading = true;
    this.error = null;

    this.userCategoryProductService
      .getProductsByCategory(categoryIdis)
      .subscribe({
        next: (data) => {
          this.categoryName = data.name; // now works ✔
          this.products = data.products; // this is what your HTML needs ✔
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products. Please try again later.';
          this.isLoading = false;
        },
      });
  }

  goToProductDetailsPage(productId: number) {
    this.router.navigate(['/farmvibe/products/product-details'], {
      state: { id: productId },
    });
  }


}
