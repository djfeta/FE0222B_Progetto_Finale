import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        // if (!user) {
        //   return next.handle(request);
        // }
        const newReq: HttpRequest<any> = request.clone({
          headers: request.headers
            .set(
              'Authorization',
              'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1Mjk2ODYzMywiZXhwIjoxNjUzMDU1MDMzfQ.UPXN59zbOChEvsPB4WSO5pYMd_L2oCh3WOpz9jx54I2m2DC3V0wNrbshvDrzFi9gugowTe0BZPu8v7kYcx0NQw'
            )
            .set('X-TENANT-ID', 'fe_0222b'),
        });

        return next.handle(newReq);
      })
    );
  }
}
