import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginApiUrl = 'http://localhost:3000/login'; 
  private registerApiUrl = 'http://localhost:3000/register';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  loginUser(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(this.loginApiUrl, loginPayload);
  }

  registerUser(username: string, password: string): Observable<any> {
    const registerPayload = { username, password, movies: [] };
    return this.http.post<any>(this.registerApiUrl, registerPayload);
  }
}
