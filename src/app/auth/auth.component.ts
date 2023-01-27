import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResData } from './auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  signupForm: FormGroup;
  loginForm: FormGroup;
  token: string;
  error:string=null;
  success:string=null;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'full_name': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'passwords': new FormGroup({
        'password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
        'password_confirm': new FormControl(null, Validators.required)
      },this.passwordCheck)
    });
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    })
  }

  onSwitch(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSignup(){
    console.log(this.signupForm)
    this.authService.register({
      'email': this.signupForm.get('email').value,
      'full_name': this.signupForm.get('full_name').value,
      'password': this.signupForm.get('passwords.password').value,
      'password_confirm': this.signupForm.get('passwords.password_confirm').value
    })
    .subscribe(
      (data: AuthResData) => {
        this.isLoginMode = true;
        this.success='Signup was successfull';
        this.error = null;
      },(errorRes)=>{
        this.error=errorRes;
      }
    )
  }
  onLogin(){
    this.authService.login(this.loginForm.value)
    .subscribe(
      (data: AuthResData) => {
        this.token = data.token
        console.log(data)
        this.router.navigate(['/profile'])
      },(errorRes)=>{
        this.error=errorRes;
      }
    )
    this.loginForm.reset()

  }

  passwordCheck(control: FormGroup): {[s:string]:boolean}{
    if(control.get('password').value != control.get('password_confirm').value){
      return {'notsame': true}
    }
    return null;
  }

}
