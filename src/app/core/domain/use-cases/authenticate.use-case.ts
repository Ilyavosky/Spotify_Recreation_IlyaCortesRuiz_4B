import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationPort } from '../ports';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUseCase {
  constructor(private authPort: AuthenticationPort) {}

  execute(): Observable<string> {
    return this.authPort.getAccessToken();
  }

  hasValidToken(): boolean {
    return this.authPort.hasToken();
  }

  logout(): void {
    this.authPort.clearToken();
  }
}