import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../../models/login.model';
import { RegisterModel } from '../../models/register.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/api/v1/user';
 

  constructor(private http: HttpClient) {
  
    
  }

  // Método para login
  login(request: LoginModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/login`, request, { headers: headers })
      .pipe(
        tap(response => {
    
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('isLogin', JSON.stringify(true)); 
     
        })
      );
  }

  register(request: RegisterModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/save`, request, { headers: headers })
      .pipe(
        tap(response => {

          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('isLogin', JSON.stringify(true)); 
     
        })
      );
    }

  getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
 
  logout(): void {
    localStorage.removeItem('user');
    localStorage.setItem('isLogin', JSON.stringify(false));
  
    window.location.reload(); 
  }
}
