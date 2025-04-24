import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000/api/';

  constructor(private readonly http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      observe: 'body',
      ...options,
    });
  }

  post<T>(url: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      observe: 'body',
      ...options,
    });
  }

  put<T>(url: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      observe: 'body',
      ...options,
    });
  }

  delete<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      observe: 'body',
      ...options,
    });
  }

  patch<T>(url: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body, {
      observe: 'body',
      ...options,
    });
  }
}
