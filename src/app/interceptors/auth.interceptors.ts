import { HttpInterceptorFn } from '@angular/common/http';
import {
  groupsListUrl,
  userLoginUrl,
  userRegistrationUrl,
  usersListUrl,
} from '../constants/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.startsWith(userRegistrationUrl) ||
    req.url.startsWith(userLoginUrl)
  ) {
    const authReg = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
    return next(authReg);
  }

  if (req.url.startsWith(groupsListUrl) || req.url.startsWith(usersListUrl)) {
    const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    console.log(token);
    const uid = data['uid'];
    const email = JSON.parse(localStorage.getItem('email')!);
    const authGroupsUsers = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'rs-uid': uid,
        'rs-email': email,
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authGroupsUsers);
  }

  return next(req);
};
