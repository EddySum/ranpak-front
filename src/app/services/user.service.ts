import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${environment.apiUrl}/user`

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<Object> {
    
    return this.http.post(`${this.apiUrl}/register`, { 
      email: email,
      password: password
    });
  }

  login(email: string, password: string): Observable<Object> {
    return this.http.post(`${this.apiUrl}/login`, { 
      email: email,
      password: password
    }, { withCredentials: true });
  }


  getUser() {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }
}
