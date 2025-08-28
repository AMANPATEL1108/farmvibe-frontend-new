import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // 🔥 Required for standalone apps
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // ✅ use "styleUrls" (plural)
})
export class App {
  protected title = 'farmvibe-frontend-new';
}
