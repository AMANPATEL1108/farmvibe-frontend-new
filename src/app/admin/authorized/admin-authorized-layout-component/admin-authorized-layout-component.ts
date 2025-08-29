import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header-component/admin-header-component';
import { AdminFooterComponent } from '../admin-footer-component/admin-footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-authorized-layout-component',
  imports: [RouterOutlet, AdminHeaderComponent, AdminFooterComponent],
  templateUrl: './admin-authorized-layout-component.html',
  styleUrl: './admin-authorized-layout-component.css',
})
export class AdminAuthorizedLayoutComponent {}
