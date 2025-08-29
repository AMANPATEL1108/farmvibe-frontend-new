import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../../authorized/admin-header-component/admin-header-component';
import { AdminFooterComponent } from '../../authorized/admin-footer-component/admin-footer-component';

@Component({
  selector: 'app-admin-layout-component',
  imports: [RouterOutlet],
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.css',
})
export class AdminLayoutComponent {}
