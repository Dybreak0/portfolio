import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Territories } from 'src/app/models/Territories.model';

@Injectable({
  providedIn: 'root'
})
export class ListService extends HttpRequestService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getAllTerritories(): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {

      this.apiGetAllTerritories()
      .subscribe({
        next: (territories: Territories) => {
          resolve(territories);
        },
        error: (e: any): void => {
          reject(e);
        }
      });
    });
  }

  private apiGetAllTerritories(): Observable<any> {
    return this.get("Territories/All")
      .pipe(map((response: any) => response));
  }
}
