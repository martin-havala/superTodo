import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class ErrInterceptor implements HttpInterceptor {
  constructor(private nzMessageSC: NzMessageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse, c: Observable<any>) => {
        this.nzMessageSC.error(e.message);
        return of(null);
      })
    );
  }
}
