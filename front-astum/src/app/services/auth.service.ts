import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/api/astum';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(public http: HttpClient) {}

  registerUser(body): Observable<any>{
    return this.http.post(`${URL}/register`, body)
  }

  loginUser(body): Observable<any>{
    return this.http.post(`${URL}/login`, body)
  }
}
