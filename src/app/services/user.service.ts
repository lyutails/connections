import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SkipSelf, inject } from '@angular/core';
import {
  GroupIdResponse,
  GroupsMetadata,
  LoginForm,
  RegistrationForm,
  SignupResponse,
  User,
  UsersMetadata,
} from '../models/user.model';
import {
  getGroupByIdUrl,
  groupsListUrl,
  userLoginUrl,
  userLogoutUrl,
  userRegistrationUrl,
  usersListUrl,
} from '../constants/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = true;
  @SkipSelf() http = inject(HttpClient);

  // constructor(private http: HttpClient) {}

  addUser({
    name,
    email,
    password,
  }: RegistrationForm): Observable<RegistrationForm> {
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    const user = {
      name: name,
      email: email,
      password: password,
    };
    return this.http.post<RegistrationForm>(userRegistrationUrl, user);
    // return this.http.post<User>(userRegistrationUrl, user);
  }

  loginUser({ email, password }: LoginForm): Observable<LoginForm> {
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    const user = {
      email: email,
      password: password,
    };

    this.isLoggedIn = true;

    return this.http.post<LoginForm>(userLoginUrl, user, config);
  }

  logout(uid: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rs-uid': uid,
        'rs-email': `daf@af.gaf`,
        Authorization: `Bearer ${token}`,
      }),
    };

    this.isLoggedIn = false;

    return this.http.delete(userLogoutUrl, options);
  }

  getGroups() {
    /* const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    console.log(token);
    const uid = data['uid']; */
    /* const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rs-uid': uid,
        'rs-email': email,
        Authorization: `Bearer ${token}`,
      }),
    };
    console.log(uid, token, email); */

    return this.http.get<GroupsMetadata>(groupsListUrl);
  }

  getUsers() {
    /* const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rs-uid': uid,
        'rs-email': `daf@af.gaffsa`,
        Authorization: `Bearer ${token}`,
      }),
    }; */

    return this.http.get<UsersMetadata>(usersListUrl);
  }

  getGroupById(uid: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rs-uid': uid,
        'rs-email': `daf@af.gaf`,
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<GroupIdResponse>(getGroupByIdUrl, options);
  }
}
