import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { GetFormError } from 'src/app/utils/getError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide: boolean = true;
  isSubmitted: boolean = false;
  lastUrl: string = '';

  constructor(private FormBuilder: FormBuilder, private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.loginForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.lastUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  getFieldError(fieldName: string) {
    return GetFormError.getFieldError(fieldName, this.loginForm, this.isSubmitted);
  }

  get fieldControl(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    this.usersService.login({email: this.fieldControl['email'].value, password: this.fieldControl['password'].value}).subscribe(() => {
      this.router.navigateByUrl(this.lastUrl);
    });
  }

}
