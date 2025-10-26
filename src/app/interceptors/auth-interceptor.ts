import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { isTokenResponse } from '../core/guards/spotify-api/is-token-response';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    tap(event => {
      if (!req.url.includes(environment.AUTH_API_URL)) {
        return;
      }

      if (event instanceof HttpResponse && event.status === 200) {
        const body = event.body as any;

        if (isTokenResponse(body)) {
          localStorage.setItem('spotify_token', body.access_token);
          console.log('Token saved to localStorage');
        }
      }
    })
  );
};