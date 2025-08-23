import { Component } from '@angular/core';
import { UserFooterComponent } from '../user-footer-component/user-footer-component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-header-component',
  imports: [RouterLink],
  templateUrl: './user-header-component.html',
  styleUrl: './user-header-component.css',
})
export class UserHeaderComponent {}
