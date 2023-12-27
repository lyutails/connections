import { LoginForm } from './../../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordRegExp } from '../../../constants/password_regexp';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  //providers: [Store],
})
export class SigninComponent {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.pattern(passwordRegExp), Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService //private store: Store
  ) {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(form: LoginForm) {
    /* const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    const uid = data['uid']; */
    console.log(this.form.value);
    this.authService.register();
    console.log(this.authService.isLoggedIn);
    this.userService.loginUser(this.form.value).subscribe((data) => {
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('email', JSON.stringify(this.form.value.email));
      console.log(data);
    });
    // this.store.dispatch(UserActions.postUserData({users: {'daf@af.gaf'}}));
    this.router.navigate(['/main']);
  }
}
