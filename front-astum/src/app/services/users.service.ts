import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/astum';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }

  getAllUsers():Observable<any>{
    return this.http.get(`${baseUrl}/users`);
  }
}
