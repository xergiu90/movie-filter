import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.api;
  }
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/X-www-form-urlencoded',
    };

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, {
      params,
      headers: this.setHeaders()
    })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object): Observable<any> {
    return this.http.put(
      `${this.apiUrl}${path}`,
      body,
      {headers: this.setHeaders()}
    ).pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: object): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}${path}`,
      body,
      {headers: this.setHeaders()}
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${path}`,
      body,
      {headers: this.setHeaders()}
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}${path}`,
      {headers: this.setHeaders()}
    ).pipe(catchError(this.formatErrors));
  }
}
