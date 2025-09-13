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
export class App {
  protected title = 'farmvibe-frontend-new';
}
