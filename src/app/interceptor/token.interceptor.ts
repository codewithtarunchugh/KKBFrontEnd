import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../core/services/user/user.service';
import { CommonConstant } from '../core/constants/CommonConstant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Get the authentication token from local storage or another source
    const authToken = localStorage.getItem('jwtToken');

    // Clone the request and add the authorization and content-type headers if the token exists
    if (authToken) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json', // Add Content-Type header
        },
      });
      return next.handle(authReq).pipe(
        catchError((error: any) => {
          // let errors:string=error;
          // errors=error;

          if (error == CommonConstant.ErrorMessage.UnauthorizedAccess) {
            const isRefresh = confirm(
              'Your Session is expired, Do you want to continue ?'
            );
            if (isRefresh) {
              this.userService.$RefreshToken.next(true);
            } else {
              this.userService.logout();
            }
          }
          return throwError(error);
        })
      );
    }

    // If no token exists, proceed with the original request
    return next.handle(request);
  }
}
