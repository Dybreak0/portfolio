import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Credentials } from 'src/app/models/Credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpRequestService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public login(credentials: Credentials): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiLogin(credentials)
        .subscribe({
          next: (response: any) => {
            resolve(response);
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
}
