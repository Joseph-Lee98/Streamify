import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public currentUserSubject = new BehaviorSubject<any>(null)
  currentUser$ = this.currentUserSubject.asObservable()
  private loginApiUrl = 'http://localhost:3000/login'; 
  private registerApiUrl = 'http://localhost:3000/register';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem("user")
    if(storedUser) this.currentUserSubject.next(JSON.parse(storedUser))
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  loginUser(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(this.loginApiUrl, loginPayload).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  registerUser(username: string, password: string): Observable<any> {
    const registerPayload = { username, password, movies: [] };
    return this.http.post<any>(this.registerApiUrl, registerPayload).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  updateUserData(user: any): Observable<any> {
    const updateUserApiUrl = `http://localhost:3000/users/${user.id}`;
    return this.http.put<any>(updateUserApiUrl, user).pipe(
      tap((updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
