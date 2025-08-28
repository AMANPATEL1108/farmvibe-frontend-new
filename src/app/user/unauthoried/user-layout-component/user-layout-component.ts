import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header-component/user-header-component';
import { UserFooterComponent } from '../user-footer-component/user-footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout-component',
  imports: [UserHeaderComponent, UserFooterComponent, RouterOutlet],
  templateUrl: './user-layout-component.html',
  styleUrl: './user-layout-component.css',
})
export class UserLayoutComponent {}
