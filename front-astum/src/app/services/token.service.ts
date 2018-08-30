import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) {

  }

  setToken(token){
    this.cookieService.set('token',token);
   // localStorage.setItem('token', token );
  }

  getToken(){
     this.cookieService.get('token');
   // return localStorage.getItem('token');

  }


  deleteToken(){
    return this.cookieService.delete('token');
  }

  getPayload(){
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
      let exp:any = new Date(payload.exp);

      if(exp*1000 < new Date().getTime()){
        this.deleteToken();
      }
    }
    return payload.data;
  }
}
