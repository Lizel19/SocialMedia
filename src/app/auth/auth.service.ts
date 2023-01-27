import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { singupModel,AuthResData,loginModel,User } from "./auth.model";
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, throwError } from "rxjs";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient,private router: Router){}

    register(account: singupModel){
        return this.http.post<AuthResData>('http://127.0.0.1:8000/api/register',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    login(account: loginModel){
        return this.http.post<AuthResData>('http://127.0.0.1:8000/api/login',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            this.handleAuth(res);
        }))
    }

    autologin(){
        const userData:AuthResData = JSON.parse(localStorage.getItem('user'))
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.user_id,userData.full_name,userData.email,userData.token)
        this.user.next(loadedUser)
        return;
    }

    private handleError(error: HttpErrorResponse){
        console.log(error)
        let errormessage = 'An unknown errror occured'
        if(!error.error){
            return throwError(errormessage)
        }
        if(error.error.non_field_errors){
            errormessage = error.error.non_field_errors[0]
        }
        if(error.error.email){
            errormessage = error.error.email[0]
        }
        return throwError(errormessage);
    }

    private handleAuth(res: AuthResData){
        const user = new User(res.user_id,res.full_name,res.email,res.token);
        this.user.next(user);
        localStorage.setItem('user',JSON.stringify(user))
    }
    logout(){
        this.user.next(null)
        localStorage.removeItem('user');
        this.router.navigate(['/auth'])
    }
}