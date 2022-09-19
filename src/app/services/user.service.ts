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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true,
    };

    return this.http.post(`${this.apiUrl}/register`, { 
      email: email,
      password: password
    },
    httpOptions);
  }
}
