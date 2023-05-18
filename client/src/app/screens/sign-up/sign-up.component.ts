import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserSignUpData } from 'src/app/types';
import { GetFormError } from 'src/app/utils/getError';
import { PasswordMatchValidator } from 'src/app/utils/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  hide: boolean = true;
  isSubmitted: boolean = false;
  lastUrl: string = '';

  constructor(private FormBuilder: FormBuilder , private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.signUpForm = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: PasswordMatchValidator('password', 'confirmPassword')
    });

    this.lastUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  getFieldError(fieldName: string) {
    return GetFormError.getFieldError(fieldName, this.signUpForm, this.isSubmitted);
  }

  get fieldControl(){
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signUpForm.invalid) return;
    const formValues = this.signUpForm.value;
    const userDetails: UserSignUpData = {
      name: formValues['name'],
      email: formValues['email'],
      password: formValues['password'],
      confirmPassword: formValues['confirmPassword']
    };
    this.usersService.signUp(userDetails).subscribe(_ => {
      this.router.navigateByUrl(this.lastUrl)
    })
  }

}
