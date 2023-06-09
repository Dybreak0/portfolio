import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  public readonly url: string = "https://netzweltexerciseapi.azurewebsites.net/NetzweltAPI";

  constructor(private httpClient: HttpClient) { }

  protected get(endpoint: string): Observable<any> {
    let urlPath: string = `${this.url}/${endpoint}`;
    return this.httpClient.get(urlPath)
      .pipe(map((data: any) => data));
  }

  protected post(endpoint: string, data: any) {
    let urlPath: string = `${this.url}/${endpoint}`;
    return this.httpClient.post(urlPath, data);
  }
}
