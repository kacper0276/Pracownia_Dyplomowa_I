import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WebSocketService } from '../services/web-socker.service';
import { environment } from '../../../environments/environment.prod';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);
  const webSocketService = inject(WebSocketService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    try {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Brak refresh tokena');
      }

      const response: any = await firstValueFrom(
        http.post(`${environment.apiUrl}auth/refresh`, { refreshToken })
      );

      authService.setLoginData(
        response.accessToken,
        response.refreshToken,
        response.user
      );

      webSocketService.connect(response.user.id.toString());

      return true;
    } catch (error) {
      router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
};
