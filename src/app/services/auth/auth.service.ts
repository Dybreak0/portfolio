import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Credentials } from 'src/app/models/Credentials.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserData } from 'src/app/models/UserData.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpRequestService {

  constructor(httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router) {
    super(httpClient);
  }

  public login(credentials: Credentials): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {

      const userDataKey: string = "user";

      this.apiLogin(credentials)
      .subscribe({
        next: (userData: UserData) => {
          this.setLoggedInUserDetails(userData, userDataKey);
          resolve(userData);
        },
        error: (e: any): void => {
          reject(e);
        }
      });
    });
  }

  private apiLogin(payload: Credentials): Observable<any> {
    return this.post("Account/SignIn", payload)
      .pipe(map((response: any) => response));
  }

  private setLoggedInUserDetails(userData: UserData, userDataKey: string) {
    const userDataLocal: string = JSON.stringify(userData);
    this.localStorageService.set(userDataKey, userDataLocal, 899);
  }

  public isLoggedIn(): boolean {
    if(!this.localStorageService.isExpired("user") && this.localStorageService.get("user") != null) {
      return true;
    }
    this.logout();
    return false;
  }

  public logout(): void {
    this.localStorageService.remove("user");
    this.router.navigateByUrl("account/login");
  }
}
