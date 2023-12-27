import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  register() {
    this.isLoggedIn = true;
  }
}
