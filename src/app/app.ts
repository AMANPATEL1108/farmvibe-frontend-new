import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFooterComponent } from './user/unauthoried/user-footer-component/user-footer-component';
import { UserHeaderComponent } from './user/unauthoried/user-header-component/user-header-component';

@Component({
  selector: 'app-root',
  standalone: true, // 🔥 Required for standalone apps
  imports: [RouterOutlet, UserFooterComponent, UserHeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // ✅ use "styleUrls" (plural)
})
export class App {
  protected title = 'farmvibe-frontend-new';
}
