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
    this.cookieService.set('token',token)
  }

  getToken(){
    return this.cookieService.get('token');
  }

  deleteToken(){
    return this.cookieService.delete('token');
  }

  getPayload(){
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = JSON.parse(atob(payload));
      let exp:any = new Date(payload.exp);
      console.log(exp*1000);
      if(exp*1000 < new Date().getTime()){
        this.deleteToken();
      }
    }
    return payload;
  }
}
