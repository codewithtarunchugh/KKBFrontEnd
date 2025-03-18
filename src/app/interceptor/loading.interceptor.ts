import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../core/services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests: number = 0; // Track the number of active requests

  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.activeRequests++;

    // Show the loading spinner when the first request is made
    if (this.activeRequests === 1) {
      this.loadingService.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        // Decrease the counter when a request completes
        this.activeRequests--;

        // Hide the loading spinner only when all requests have completed
        if (this.activeRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
