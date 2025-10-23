import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { CookiesStorageService } from '../services/general/cookies-storage-service';
import { isTokenResponse } from '../core/guards/spotify-api/is-token-response';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const _cookieService = inject(CookiesStorageService);

  return next(req).pipe(
    tap(event => {
      if (!req.url.includes(environment.AUTH_API_URL)) {
        return;
      }

      if (event instanceof HttpResponse && event.status === 200) {
        console.log('Auth Interceptor - Received response from Auth URL:', event.body);
        const body = event.body as any;

        if (isTokenResponse(body)) {
          const expirationMS = 60 * 60 * 1000; // 1 hour
          const expirationDate = new Date(Date.now() + expirationMS);

          console.log(`Auth Interceptor - Saving token: ${body.access_token.substring(0, 10)}... Expires: ${expirationDate}`);
          _cookieService.setKey('access_token', body.access_token, expirationDate);
        } else {
           console.warn('Auth Interceptor - Response from Auth URL is not a valid TokenResponse.');
        }
      } else if (event instanceof HttpResponse) {
         console.warn(`Auth Interceptor - Received non-200 response from Auth URL: ${event.status}`);
      }
    })
  );
};