import { Component, OnInit } from '@angular/core';
import { AuthenticateUseCase } from './core/domain/use-cases';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  ngOnInit(): void {
    this.refreshToken();
  }

  private refreshToken(): void {
    this.authenticateUseCase.execute().subscribe({
      next: () => {
        console.log('Token refreshed successfully');
      },
      error: (err) => {
        console.error('Error refreshing token:', err);
      }
    });
  }
}