import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
