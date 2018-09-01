import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { e } from '../../../node_modules/@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) {

  }

  setToken(token){
   return this.cookieService.set('token',token);
  //  return localStorage.setItem('token', token );
  }

  getToken(){
   return this.cookieService.get('token');
  //  return localStorage.getItem('token');

  }


  deleteToken(){
    return this.cookieService.delete('token');
   // return localStorage.removeItem('token');
  }

  getPayload(){
    const token = this.getToken();
    let payload;
    if(token){

      payload = token.split('.')[1];
      let decode = JSON.parse(atob(payload));

      let exp:any = new Date(decode.exp);

      if(exp*1000 < new Date().getTime()){
        this.deleteToken();
      }

      return decode.data;
    }
  }

}
