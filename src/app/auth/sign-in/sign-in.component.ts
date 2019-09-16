import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  access: boolean;

  constructor( private router: Router, private authService :AuthService) { 
    if (this.authService.isLoggedIn) {
      console.log("authenticated");
      const user = JSON.parse(localStorage.getItem('currentUser')).roleName
      if(user=='admin'){
        this.router.navigate(['/admin/brands']);
      }else{
        this.router.navigate(['/home']);
      }
    }
  }
  loginForm: FormGroup
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, this.validateEmail]),
      password: new FormControl(null, [Validators.required])
    });
    this.access = false;


  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  validateEmail(control: FormControl): { [s: string]: boolean } {
    var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valid.test(control.value)) {
      console.log(control.value)
      return null; // vaild
    }
    return { 'validationError': true } //invalid
  }
  // SIBMIT LOGIN FORM
  onSubmit(form) {
    console.log(form)
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.email.value, this.password.value).pipe(first()).subscribe(
      res => {
        console.log(res);
        const user = JSON.parse(localStorage.getItem("currentUser")).roleName;
        if(user==="admin"){
          this.router.navigate(["/admin/brands"])
        }
        if(user==="vendor"||user==="fleet"||user==="user"){
          this.router.navigate(["/home"])
        }
      },
      error => {
        console.log(error);
        if(error.ok==false){
          this.access=true;
          this.email.setValue(" ");
          this.password.setValue(" ");
        }
      });
  }
}
