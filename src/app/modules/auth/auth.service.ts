import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CONSTANTS} from "../../shared/utilities/Constants";
import {IResponse, IUser} from "./auth.models";

/**
 * The authentication service is used to login and logout of the application.
 * The logged in user details are stored in local storage so the user will stay
 * logged in if they refresh the browser and also between browser sessions until they logout.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storage: Storage = localStorage;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public get currentUserValue(): IUser {
    return this.user;
  }

  /**
   * Posts the users credentials to the api and checks the response for a User object,
   * if there is one it means authentication was successful so the user details
   * are added to local storage.
   */
  login(username: string, password: string): Observable<any> {
    const user: IUser = {
      id: 1,
      username: 'robert',
      password: '123456',
    };
    user.token = `${btoa(`${username}:${password}`)}`;
    this.storage.setItem('currentUser', JSON.stringify(user));
    return of(user);
    /*return this.http.post<any>(
      CONSTANTS.API_URL + 'users/login',
      {username: username, password: password}
    )
      .pipe(
        map((user: IUser) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.token = `${btoa(`${username}:${password}`)}`;
          this.storage.setItem('currentUser', JSON.stringify(user));
          return user;
        })
      );*/
  }

  logout() {
    this.clearAll();
    this.router.navigateByUrl('/auth/login');
  }

  saveResponse(response: { participantId: number, responseList: IResponse[] }): Observable<any> {
    return this.http.post<any>(CONSTANTS.API_URL + 'participants/save-response', response);
  }

  getAllResponses(): Observable<IResponse[]> {
    return this.http.get<IResponse[]>(CONSTANTS.API_URL + 'responses');
  }

  private clearAll() {
    this.storage.clear();
  }

  private get user() {
    return JSON.parse(this.storage.getItem('currentUser'));
  }

}
