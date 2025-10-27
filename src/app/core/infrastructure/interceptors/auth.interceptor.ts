import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

function isTokenResponse(body: unknown): body is { access_token: string } {
  if (typeof body !== 'object' || body === null) return false;
  return 'access_token' in body && typeof (body as { access_token: unknown }).access_token === 'string';
}

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
        }
      }
    })
  );
};