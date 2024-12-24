import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(public authService: AuthService){}

  get isLoggedIn():boolean{
    return this.authService.isLoggedIn()
  }

  logout(): void {
    localStorage.removeItem('username');
  }
}

