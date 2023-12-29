import {
  RegistrationForm,
  UserProfileData,
  UsersData,
} from './../../../models/user.model';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { passwordRegExp } from '../../../constants/password_regexp';
// import { Store, select } from '@ngrx/store';
// import * as UserActions from '../../../store/user_data.actions'
// import { userSelector } from 'src/app/store/user_data.selectors';
import { Observable } from 'rxjs';
import { nameRegExp } from '../../../constants/name_regexp';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  // usersData$:  Observable<UserProfileData[]>;

  form = this.fb.group({
    name: ['', [Validators.pattern(nameRegExp), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.pattern(passwordRegExp), Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService // private store: Store<UserProfileData[]>
  ) {
    // this.usersData$ = this.store.pipe(select(userSelector))
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(form: RegistrationForm) {
    localStorage.clear();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    localStorage.setItem('createdAt', currentDate);
    localStorage.setItem('name', this.form.value?.name!);
    console.log(this.form.value);
    this.authService.register();
    console.log(this.authService.isLoggedIn);
    this.userService.addUser(this.form.value).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/signin']);
  }
}
