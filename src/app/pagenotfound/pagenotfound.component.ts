import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  standalone: false,
  
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {
  constructor(private router: Router){}
  goHome():void{
    this.router.navigate(['']);
  }
}
