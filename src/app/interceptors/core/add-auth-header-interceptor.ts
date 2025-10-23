import { HttpInterceptorFn} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { CookiesStorageService } from '../../services/general/cookies-storage-service';

export const addAuthHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  const _cookieStorage: CookiesStorageService = inject(CookiesStorageService)

  if(!req.url.includes(environment.API_URL) || req.url.includes(environment.AUTH_API_URL)){
  return next(req);
  }

  const token = _cookieStorage.getKeyValue('access_token');
  console.log(`AddAuthHeader Interceptor - Adding token to ${req.url}: ${token ? token.substring(0, 10) + '...' : 'No Token Found!'}`);

  if(!token){
    console.error('AddAuthHeader Interceptor - No access token found in cookies!');
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(newReq);
};
