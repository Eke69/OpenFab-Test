import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserLogInData, UserSignUpData } from '../types';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, SIGNUP_URL } from '../constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  signUp(signUpData: UserSignUpData): Observable<User> {
    return this.http.post<User>(SIGNUP_URL, signUpData).pipe(
      tap({
        next: (user)=> {
          this.storeUser(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome, ${user.name} `, 'Sign up Successful')
        }, error: (err)=> {
          this.toastrService.error('fdf', 'Login Error')
        }
      }
    )
    );
  }

  login(logInData: UserLogInData): Observable<User> {
    console.log('login', logInData);
    return this.http.post<User>(LOGIN_URL, logInData).pipe(
      tap({
        next: (user)=> {
          this.storeUser(user);
          this.userSubject.next(user);
          this.toastrService.success('User Successfully Signed In.', 'Login Successful')
        }, error: (err)=> {
          this.toastrService.error('fdf', 'Login Error')
        }
      }
    )
    );
  }

  logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private storeUser(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromStorage(): User{
    const userJSON = localStorage.getItem(USER_KEY);
    if(userJSON) {
      return JSON.parse(userJSON) as User;
    }
    return new User(); 
  }
}
