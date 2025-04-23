import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'jwt_token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  private readonly USER = 'user';

  public setJwtToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  public getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public setUser(user: any): void {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(this.USER) || '{}');
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
