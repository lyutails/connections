import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const data = JSON.parse(localStorage.getItem('data')!);
    const token = data['token'];
    const uid = data['uid'];

    /* const authReg = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    }); */
    const authReg = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'rs-uid': uid,
        'rs-email': `daf@af.gaf`,
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReg);
  }
}

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const data = JSON.parse(localStorage.getItem('data')!);
  const token = data['token'];
  const uid = data['uid'];

  /* const authReg = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        }); */
  const authReg = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'rs-uid': uid,
      'rs-email': `daf@af.gaf`,
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReg);
};
