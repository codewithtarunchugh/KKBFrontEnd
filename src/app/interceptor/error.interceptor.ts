import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('this is server side error');
          if (error.status === 404) {
            errorMsg = 'Resource not found';
          } else if (error.status === 401) {
            errorMsg = 'Unauthorized Access';
          } else if (error.status === 500) {
            errorMsg = 'Internal Server Error';
          } else {
            errorMsg =
              'Error Code: ${error.status},  Message: ${error.message}';
          }
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
