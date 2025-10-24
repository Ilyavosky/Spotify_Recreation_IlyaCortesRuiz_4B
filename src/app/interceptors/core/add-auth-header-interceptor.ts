import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const addAuthHeaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  if (req.url.includes('accounts.spotify.com')) {
    return next(req);
  }

  if (req.url.includes(environment.API_URL)) {
    const token = localStorage.getItem('spotify_token');

    if (token && token !== '') {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(newReq);
    } else {
      console.error('No se encontró token válido');
      return next(req);
    }
  }

  return next(req);
};