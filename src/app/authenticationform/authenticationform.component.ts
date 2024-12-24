import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-authenticationform',
  standalone: false,
  
  templateUrl: './authenticationform.component.html',
  styleUrl: './authenticationform.component.css'
})
export class AuthenticationformComponent implements OnInit {
  authenticationForm: FormGroup = new FormGroup({});
  isLoginForm: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, ) {}

  ngOnInit(): void {
    this.isLoginForm = this.router.url === '/login'
    this.authenticationForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit(){
    if(this.authenticationForm.valid){
      // post requests
    }
  }

}
