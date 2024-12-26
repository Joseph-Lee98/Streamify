import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-authenticationform',
  standalone: false,
  
  templateUrl: './authenticationform.component.html',
  styleUrl: './authenticationform.component.css'
})
export class AuthenticationformComponent implements OnInit {
  authenticationForm: FormGroup = new FormGroup({});
  isLoginForm: boolean = true;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoginForm = this.router.url === '/login'
    this.authenticationForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern(/^[a-zA-Z0-9._]+$/)]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    })
  }

  onSubmit(): void {
    if (this.authenticationForm.valid) {
      const { username, password } = this.authenticationForm.value;
      this.loading = true;
      this.errorMessage = '';
  
      const observer = {
        next: (response: any) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.loading = false;
          this.router.navigate(['']);
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error.error.message || 'An unexpected error occurred.';
        },
      };
  
      if (this.isLoginForm) {
        this.authService.loginUser(username, password).subscribe(observer);
      } else {
        this.authService.registerUser(username, password).subscribe(observer);
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
