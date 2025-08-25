import { Routes } from '@angular/router';
import { HomePageComponent } from './user/unauthoried/home-page-component/home-page-component';
import { UserContactComponent } from './user/unauthoried/user-contact-component/user-contact-component';
import { UserProductsComponent } from './user/unauthoried/user-products-component/user-products-component';
import { UserCategoryComponent } from './user/unauthoried/user-category-component/user-category-component';
import { UserAboutUsComponent } from './user/unauthoried/user-about-us-component/user-about-us-component';
import { UserSigninComponent } from './user/unauthoried/user-signin-component/user-signin-component';
import { UserRegisterComponent } from './user/unauthoried/user-register-component/user-register-component';
import { UserProductDetailsComponent } from './user/unauthoried/user-product-details-component/user-product-details-component';
import { UserAddressDetailComponent } from './user/authorized/user-address-detail-component/user-address-detail-component';
import { UserPaymentOptionsComponent } from './user/authorized/user-payment-options-component/user-payment-options-component';
import { UserOrderCodConfirmationComponent } from './user/authorized/user-order-cod-confirmation-component/user-order-cod-confirmation-component';
import { UserOrderOnlineConfirmationComponent } from './user/authorized/user-order-online-confirmation-component/user-order-online-confirmation-component';
import { UserProdutsCategoryComponent } from './user/unauthoried/user-produts-category-component/user-produts-category-component';

export const routes: Routes = [
  { path: '', redirectTo: '/farmvibe/home', pathMatch: 'full' },
  { path: 'farmvibe/home', component: HomePageComponent },
  { path: 'farmvibe/contact', component: UserContactComponent },
  { path: 'farmvibe/products', component: UserProductsComponent },
  {
    path: 'farmvibe/products/product-details',
    component: UserProductDetailsComponent,
  },
  { path: 'farmvibe/products/address', component: UserAddressDetailComponent },
  {
    path: 'farmvibe/products/payment-options',
    component: UserPaymentOptionsComponent,
  },
  {
    path: 'farmvibe/products/payment-options/cod',
    component: UserOrderCodConfirmationComponent,
  },
  {
    path: 'farmvibe/products/payment-options/online',
    component: UserOrderOnlineConfirmationComponent,
  },
  { path: 'farmvibe/category', component: UserCategoryComponent },
  {
    path: 'farmvibe/category/product-category',
    component: UserProdutsCategoryComponent,
  },

  { path: 'farmvibe/about', component: UserAboutUsComponent },
  { path: 'farmvibe/signin', component: UserSigninComponent },
  { path: 'farmvibe/register', component: UserRegisterComponent },
];
