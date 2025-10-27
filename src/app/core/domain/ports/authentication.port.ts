import { Observable } from 'rxjs';

export abstract class AuthenticationPort {
  abstract getAccessToken(): Observable<string>;
  abstract hasToken(): boolean;
  abstract clearToken(): void;
}