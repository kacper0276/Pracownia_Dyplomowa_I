import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000/api/';

  constructor(private readonly http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${url}`, {
      observe: 'body',
      responseType: 'json',
      ...options,
    } as {
      observe: 'body';
      responseType: 'json';
    });
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      observe: 'body',
      responseType: 'json',
      ...options,
    } as {
      observe: 'body';
      responseType: 'json';
    });
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      observe: 'body',
      responseType: 'json',
      ...options,
    } as {
      observe: 'body';
      responseType: 'json';
    });
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      observe: 'body',
      responseType: 'json',
      ...options,
    } as {
      observe: 'body';
      responseType: 'json';
    });
  }

  patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body, {
      observe: 'body',
      responseType: 'json',
      ...options,
    } as {
      observe: 'body';
      responseType: 'json';
    });
  }
}
