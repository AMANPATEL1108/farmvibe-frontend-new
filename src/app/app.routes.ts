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
import { UserProfileDetailsComponent } from './user/authorized/user-profile-details-component/user-profile-details-component';
import { UserActiveOrderListComponent } from './user/authorized/user-active-order-list-component/user-active-order-list-component';
import { UserOlderOrderListComponent } from './user/authorized/user-older-order-list-component/user-older-order-list-component';
import { UserForgotPasswordComponent } from './user/unauthoried/user-forgot-password-component/user-forgot-password-component';
import { UserUpdatePasswordComponent } from './user/unauthoried/user-update-password-component/user-update-password-component';
import { AdminLoginComponent } from './admin/unauthorized/admin-login-component/admin-login-component';
import { AdminLayoutComponent } from './admin/unauthorized/admin-layout-component/admin-layout-component';
import { UserLayoutComponent } from './user/unauthoried/user-layout-component/user-layout-component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/farmvibe/home', pathMatch: 'full' },
//   { path: 'farmvibe/home', component: HomePageComponent },
//   { path: 'farmvibe/contact', component: UserContactComponent },
//   { path: 'farmvibe/products', component: UserProductsComponent },
//   {
//     path: 'farmvibe/products/product-details',
//     component: UserProductDetailsComponent,
//   },
//   { path: 'farmvibe/products/address', component: UserAddressDetailComponent },
//   {
//     path: 'farmvibe/products/payment-options',
//     component: UserPaymentOptionsComponent,
//   },
//   {
//     path: 'farmvibe/products/payment-options/cod',
//     component: UserOrderCodConfirmationComponent,
//   },
//   {
//     path: 'farmvibe/products/payment-options/online',
//     component: UserOrderOnlineConfirmationComponent,
//   },
//   { path: 'farmvibe/category', component: UserCategoryComponent },
//   {
//     path: 'farmvibe/category/product-category',
//     component: UserProdutsCategoryComponent,
//   },

//   { path: 'farmvibe/about', component: UserAboutUsComponent },
//   { path: 'farmvibe/signin', component: UserSigninComponent },
//   { path: 'farmvibe/register', component: UserRegisterComponent },
//   {
//     path: 'farmvibe/user/user-profile',
//     component: UserProfileDetailsComponent,
//   },
//   {
//     path: 'farmvibe/user/user-active-orders',
//     component: UserActiveOrderListComponent,
//   },
//   {
//     path: 'farmvibe/user/user-older-orders',
//     component: UserOlderOrderListComponent,
//   },
//   {
//     path: 'farmvibe/forgot-password',
//     component: UserForgotPasswordComponent,
//   },
//   {
//     path: 'farmvibe/user/update-password',
//     component: UserUpdatePasswordComponent,
//   },

//   //admin Routes Here Below Side
//   {
//     path: 'farmvibe/admin',
//     redirectTo: 'farmvibe/admin/login',
//     pathMatch: 'full', // ensures only exact 'farmvibe/admin' gets redirected
//   },
//   {
//     path: 'farmvibe/admin',
//     children: [
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//       { path: 'login', component: AdminLoginComponent },
//     ],
//   },
// ];

export const routes: Routes = [
  { path: '', redirectTo: '/farmvibe/home', pathMatch: 'full' },

  // 👇 User side
  {
    path: 'farmvibe',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'contact', component: UserContactComponent },
      { path: 'products', component: UserProductsComponent },
      {
        path: 'products/product-details',
        component: UserProductDetailsComponent,
      },
      { path: 'products/address', component: UserAddressDetailComponent },
      {
        path: 'products/payment-options',
        component: UserPaymentOptionsComponent,
      },
      {
        path: 'products/payment-options/cod',
        component: UserOrderCodConfirmationComponent,
      },
      {
        path: 'products/payment-options/online',
        component: UserOrderOnlineConfirmationComponent,
      },
      { path: 'category', component: UserCategoryComponent },
      {
        path: 'category/product-category',
        component: UserProdutsCategoryComponent,
      },
      { path: 'about', component: UserAboutUsComponent },
      { path: 'signin', component: UserSigninComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'user/user-profile', component: UserProfileDetailsComponent },
      {
        path: 'user/user-active-orders',
        component: UserActiveOrderListComponent,
      },
      {
        path: 'user/user-older-orders',
        component: UserOlderOrderListComponent,
      },
      { path: 'forgot-password', component: UserForgotPasswordComponent },
      { path: 'user/update-password', component: UserUpdatePasswordComponent },
    ],
  },

  // 👇 Admin side
  {
    path: 'farmvibe/admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent },
    ],
  },
];
