import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(
    private tokenService: TokenService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const headerConf = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    const token = this.tokenService.getToken();
    if(token){
      headerConf['Authorization']=`bearer ${token}`
    }
    const _req = req.clone({setHeaders: headerConf});
    return next.handle(_req)
  }

}
