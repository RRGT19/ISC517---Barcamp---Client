import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../../modules/auth/auth.service";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class HttpResponseHandlerService {

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {
  }

  public onCatch(response: HttpErrorResponse, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;
      case 401:
        this.handleUnauthorized();
        break;
      case 403:
        this.handleForbidden();
        break;
      case 404:
        this.handleNotFound(response);
        break;
      case 500:
        this.handleServerError(response);
        break;
      default:
        this.handleBadRequest(response);
        break;
    }
    return throwError(response);
  }

  private handleBadRequest(responseBody: HttpErrorResponse): void {
    if (responseBody.error.message) {
      this.toastService.showError(
        'Error',
        responseBody.error.message
      );
    } else {
      this.handleServerError(responseBody);
    }
  }

  private handleUnauthorized(): void {
    this.authService.logout();
  }

  private handleForbidden(): void {
    this.toastService.showError(
      'Prohibido',
      'Credenciales de autenticación insuficientes para otorgar acceso.'
    );
  }

  private handleNotFound(responseBody: HttpErrorResponse): void {
    this.toastService.showError(responseBody.error.message);
  }

  private handleServerError(responseBody: HttpErrorResponse): void {
    this.toastService.showError(
      'Error',
      responseBody.error.message ? responseBody.error.message
        : 'El servidor encontró una condición inesperada. Póngase en contacto con su administrador.'
    );
  }
}
