import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<{ username: string; email: string; token: string }>(
      `${this.baseUrl}/login`,
      { email, password }
    ).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('usuario', JSON.stringify({
            nome: response.username,
            email: response.email,
            token: response.token
          }));
        }
      })
    );
  }

  registration(user: any) {
    return this.http.post<{ token: string }>(`${this.baseUrl}`, user);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
