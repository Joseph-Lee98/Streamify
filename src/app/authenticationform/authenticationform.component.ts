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
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit(): void {
    if (this.authenticationForm.valid) {
      const {username,password} = this.authenticationForm.value
      this.loading = true;
      this.errorMessage = ''
      if(this.isLoginForm){
        this.authService.loginUser(username,password).subscribe(()=>{
          localStorage.setItem("username",username);
          this.loading=false
          this.router.navigate([''])
        },(error)=>{
          this.loading = false;
          this.errorMessage = error.error.message || 'An unexpected error occurred during login.';
        })
      }
      else{
        this.authService.registerUser(username,password).subscribe(()=>{
          localStorage.setItem("username",username)
          this.loading=false
          this.router.navigate([''])
        },(error)=>{
              this.loading = false;
          this.errorMessage = error.error.message || 'An unexpected error occurred during login.';
        })
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
