import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "../../modules/auth/auth.service";

/**
 * JWT: JSON Web Tokens.
 * The JWT Interceptor intercepts http requests from the application to add a JWT auth token
 * to the Authorization header if the user is logged in.
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Add the Authorization if the request doesn't have it.
    if (!request.headers.has('Authorization')) {
      // add authorization header with jwt token if available
      const currentUser = this.authService.currentUserValue;
      if (currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${currentUser.token}`
          }
        });
      }
    }

    // Send cloned request with header to the next handler.
    return next.handle(request);

  }

}
