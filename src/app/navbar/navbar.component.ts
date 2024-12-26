import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private router: Router,public authService: AuthService){}

  get isLoggedIn():boolean{
    return this.authService.isLoggedIn()
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}

