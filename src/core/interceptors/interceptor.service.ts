import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataInterceptorService implements HttpInterceptor {
  private apiKey = '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';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(this.procesarRequest(req)).pipe(
      catchError((status: HttpErrorResponse) => {
        return of(
          status?.error?.errors[0]?.message ||
          'Se ha producido un error inesperado'
        );
      })
    );
  }

  procesarRequest(request: any) {
    request = this.addHeaders(request);
    return request;
  }

  addHeaders(request: any) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      }
    });
  }

}
