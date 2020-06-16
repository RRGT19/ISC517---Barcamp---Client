import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * Intercepts http requests from the application to add the Content-Type.
 */

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Add the Content-Type if the request doesn't have it.
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    // Send cloned request with header to the next handler.
    return next.handle(request);

  }

}
