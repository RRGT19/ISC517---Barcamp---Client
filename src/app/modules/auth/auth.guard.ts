import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

/**
 * Used to prevent unauthenticated users from accessing restricted routes.
 * This guard uses the AuthService to check if the user is logged in.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  /**
   * Requiring authentication.
   */
  checkLogin(): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigateByUrl('/auth/login');
    return false;
  }

  /**
   * Accessible only to authenticated users.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

}
