import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpService) {}
}
