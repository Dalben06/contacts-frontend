import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  authForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private _authService: AuthService, private router: Router, private formBuilder: FormBuilder) { 
    localStorage.clear();
    this.authForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }



 onSubmit() {
  
    if (this.authForm?.invalid) {
      this.submitted = true;
      this.loading = true;
      return;
    } 
    
    this.submitted = true;
    this.loading = true;
    this._authService.auth(this.authForm?.controls['username'].value,this.authForm?.controls['password'].value )
        .subscribe({
          next: (res) => {
              this.router.navigate(["contacts"]);

          },
          error: (res) => {
            this.loading = false;
            this.submitted = false;
          },
        });
    
  }
}
