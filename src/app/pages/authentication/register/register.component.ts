import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  authForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private _authService: AuthService, private router: Router, private formBuilder: FormBuilder) { 
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
    this._authService.registerUser(this.authForm.value )
        .subscribe({
          next: (res) => {
              this.router.navigate(["/authentication/login"]);
          },
          error: (res) => {
            this.loading = false;
            this.submitted = false;
          },
        });
    
  }
}
