import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpService) {}

  searchUsers(query: string) {
    return this.http.get<any[]>(`/users/search`, {
      params: { query },
    });
  }
}
