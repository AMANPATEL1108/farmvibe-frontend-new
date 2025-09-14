import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderComponentService } from './user/unauthoried/user-header-component/user-header-component-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected title = 'farmvibe-frontend-new';

  constructor(private headerService: UserHeaderComponentService) {}

  ngOnInit() {
    // Ensure authentication is checked on app initialization
    this.headerService.checkTokenOnStart();
  }
}
