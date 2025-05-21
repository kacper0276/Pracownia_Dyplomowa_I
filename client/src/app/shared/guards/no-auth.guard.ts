import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);

  if (!authService.isLoggedIn()) {
  }

  if (authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  } else {
    try {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Brak refresh tokena');
      }

      const response: any = await http
        .post(`${environment.apiUrl}auth/refresh`, { refreshToken })
        .toPromise();

      authService.setLoginData(
        response.token,
        response.refreshToken,
        response.user
      );

      router.navigate(['/']);
      return false;
    } catch (error) {
      return true;
    }
  }
};
