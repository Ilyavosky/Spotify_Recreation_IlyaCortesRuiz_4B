import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const addAuthHeaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  if (req.url.includes('accounts.spotify.com')) {
    return next(req);
  }

  if (req.url.includes(environment.API_URL)) {
    const token = localStorage.getItem('spotify_token');

    if (token && token !== '') {
      console.log('Adding auth header with token:', token.substring(0, 20) + '...');
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(newReq);
    } else {
      console.error('No valid token found in localStorage');
      return next(req);
    }
  }

  return next(req);
};