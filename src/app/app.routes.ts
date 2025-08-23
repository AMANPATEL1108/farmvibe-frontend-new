import { Routes } from '@angular/router';
import { HomePageComponent } from './user/unauthoried/home-page-component/home-page-component';
import { UserContactComponent } from './user/unauthoried/user-contact-component/user-contact-component';
import { UserProductsComponent } from './user/unauthoried/user-products-component/user-products-component';
import { UserCategoryComponent } from './user/unauthoried/user-category-component/user-category-component';
import { UserAboutUsComponent } from './user/unauthoried/user-about-us-component/user-about-us-component';
import { UserSigninComponent } from './user/unauthoried/user-signin-component/user-signin-component';
import { UserRegisterComponent } from './user/unauthoried/user-register-component/user-register-component';

export const routes: Routes = [
  { path: '', redirectTo: '/farmvibe/home', pathMatch: 'full' },
  { path: 'farmvibe/home', component: HomePageComponent },
  { path: 'farmvibe/contact', component: UserContactComponent },
  { path: 'farmvibe/products', component: UserProductsComponent },
  { path: 'farmvibe/category', component: UserCategoryComponent },
  { path: 'farmvibe/about', component: UserAboutUsComponent },
  { path: 'farmvibe/signin', component: UserSigninComponent },
  { path: 'farmvibe/register', component: UserRegisterComponent },
];
