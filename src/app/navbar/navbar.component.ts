import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  logout(): void {
    localStorage.removeItem('username');
    alert('You have been logged out.');
  }
}

